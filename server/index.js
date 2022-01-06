const express = require('express');
const app = express();
const config = require('./config/key');

// MongoDB connection
const mongoose = require('mongoose');
// useNewUrlParser is required to remove 'Deprecated' warnings
mongoose.connect(config.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('DB successfully connected'))
    .catch((err) => console.error(err));

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {auth} = require('./middleware/auth');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const { User } = require('./models/user');

app.get('/', (req, res) => res.send('Hello World!!'));

app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

// Registers a new user
app.post('/api/user/register', (req, res) => {
    const user = new User(req.body);
    
    user.save((err, doc) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).json({
            success: true,
            userData: doc
        });
    });
});

app.post('/api/user/login', (req, res) => {
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

app.get('/api/user/logout', auth, (req, res) => {
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});