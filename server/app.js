const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const validator = require("express-validator");

const config = require('./config/config');

mongoose.connect(config.DBPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.error(error));

mongoose.connection.on('connected', () => {
    console.log("Connected to Database : " + config.DBPath);
});

mongoose.connection.on('error', (err) => {
    console.log("Database Error : " + err);
});

const UserRouter = require('./router/router');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(validator());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', UserRouter);

const port = config.Port || 3000;

app.listen(port, () => console.log("Server started at port : " + port));

app.use(express.static("../client"))
