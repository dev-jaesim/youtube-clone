const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

// Registers a new user
router.post('/register', (req, res) => {
    const user = new User(req.body);
    
    user.save((err, doc) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true,
            userData: doc
        });
    });
});

router.post('/login', (req, res) => {
    // Finds the user's email
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: 'Auth fails, the email not found'
            });
        }

        // Verifies the password
        user.comparePassword(req.body.password, (err, isMatched) => {
            if(!isMatched) {
                return res.json({
                    loginSuccess: false,
                    message: 'Wrong password'
                });
            } else {
                // Generates a token
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                    res.cookie('x_auth', user.token)
                        .status(200)
                        .json({loginSuccess: true});
                });
            }
        });
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if(err) {
            return res.json({
                logoutSuccess: false,
                err
            });
        };

        return res.status(200).send({logoutSuccess: true});
    });
});

module.exports = router;