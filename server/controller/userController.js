const mongoose = require('mongoose');
const User = mongoose.model('User');
const details = mongoose.model('detailsModel');

exports.logIn = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Address').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 3 });

    req.getValidationResult().then(err => {
        if (err.isEmpty()) {
            userServices.logIn(req.body, (err, data) => {
                if (!err) {
                    response.status = true;
                    response.data = data;

                    res.status(200).send(response);
                } else {
                    response.status = false;
                    response.error = err;
                    res.status(400).send(response);
                }
            });
        } else {
            response.status = false;
            response.error = "Invalid Email or Password";
            res.status(422).send(response);
        }
    });
}

exports.register = (req, res) => {
    var response = {}

    req.checkBody('firstName', 'Invalid Name or Length of Name').isString().isLength({ min: 3 });
    req.checkBody('lastName', 'Invalid Name or Length of Name').isString().isLength({ min: 3 });
    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 3 }).equals(req.body.confirmPassword);
    
    req.getValidationResult().then((err) => {
        if (err.isEmpty()) {
            userServices.addUser(req.body, (err, data) => {
                if (err) {
                    response.status = false;
                    response.error = err;
                    res.status(422).send(response);
                } else {
                    response.status = true;
                    response.data = data;

                    res.status(200).send(response);
                }
            });
        } else {
            response.status = false;
            response.error = "Invalid Details Entered";
            res.status(500).send(response);
        }
    });
}

exports.addDetails = (req, res, next) => {
    var info = new details({
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        mailId = req.body.mailId
    });

    info.save((err, doc) => {
        if (!err)
            res.send(doc);
    });
}
