const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const { Video } = require('../models/video');
const { Subscriber } = require('../models/Subscriber');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single('file');

router.post("/upload", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/thumbnail", (req, res) => {
    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
});

router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body);
    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true 
        });
    });
});

router.post("/getVideoDetail", (req, res) => {
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, videoDetail });
        });
});

router.get("/getVideos", (req, res) => {
    Video.find()
      .populate('writer')
      .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, videos });
      });
  });

router.post("/getSubscriptionVideos", (req, res) => {
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            
            const subscribeUsers = info.map(item => item.userTo);

            let videos = [];

            Video.find({ writer: { $in: subscribeUsers } })
                    .populate('writer')
                    .exec((err, videos) => {
                        if(err) return res.status(400).send(err);
                        return res.status(200).json({ success: true, videos });
                    });
        });
});

module.exports = router;