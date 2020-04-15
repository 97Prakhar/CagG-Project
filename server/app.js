const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const config = require('./config/config');

mongoose.connect(config.DBPath, (err) => {
    if (!err) {
        console.log("Database Connection Succesful");
    } else {
        console.log("Error connecting to database")
    }
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Database' + config.DBPath);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error' + err);
});

const UserRouter = require('./router/router');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api', UserRouter);

const port = config.Port || 3000;

app.listen(port, () => console.log("Server started at port: "+port));
