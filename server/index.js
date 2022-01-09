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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!!'));

app.use('/api/user', require('./routes/user'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});