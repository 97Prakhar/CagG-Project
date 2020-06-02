const userServices = require('../services/userServices');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

/**
 * Required : First Name, Last Name, Email, Password, Confirm Password
 * Returns status, data/error
*/
exports.register = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 }).equals(req.body.confirmPassword);

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

/**
 * Required : Email, Password
 * Returns status, (token, email)/error
*/
exports.logIn = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 });

    req.getValidationResult().then((err) => {
        if (err.isEmpty()) {
            userServices.getUserByMailId(req.body.email, (err, data) => {
                if (err) throw err;
                if (!data) {
                    response.status = false;
                    response.error = "User Not Found";
                    res.send(response);
                }

                userServices.comparePassword(req.body.password, data.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({ data: data }, config.secret, {
                            expiresIn: 604800 // 1 week
                        });
                        response.status = true;
                        response.token = 'JWT ' + token;
                        response.email = data.email;
                        res.status(200).send(response);
                    } else {
                        response.status = false;
                        response.error = "Wrong Password";
                        res.send(response);
                    }
                });
            });
        } else {
            response.status = false;
            response.error = "Invalid Details Entered";
            res.status(500).send(response);
        }
    });
}

/**
 * Sends current loggenIn User from userModel
*/
exports.loggedInUser = (req, res) => {
    var response = {}

    response.status = true;
    response.email = req.user.email;
    res.status(200).send(response);
}

/**
 * Sends all details of Current User from detailsModel along with Status
*/
exports.userDetails = (req, res) => {
    var response = {}

    userServices.userDetails(req.user, (err, data) => {
        if (err) {
            response.status = false;
            response.error = err;
            res.status(422).send(response);
        } else {
            response.status = true;
            response.firstName = data.firstName;
            response.lastName = data.lastName;
            response.email = data.email;
            response.contact = data.contact;
            response.country = data.country;
            response.state = data.state;
            response.qualification = data.qualification;
            response.experience = data.experience;
            response.projects = data.projects;
            res.status(200).send(response);
        }
    });
}

/**
 * Required : First Name, Last Name, Email, Contact, Country, State, Technology, Qualification, Experience, Project
 * Returns status, data/error
*/
exports.editUser = (req, res) => {
    var response = {}

    req.checkBody('firstName', 'Invalid Name or Length of Name').isString().isLength({ min: 4 });
    req.checkBody('lastName', 'Invalid Name or Length of Name').isString().isLength({ min: 4 });
    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('contact', 'Invalid Contact Number').isString().isLength({ min: 10 });
    req.checkBody('country', 'Invalid Country Details').isString().isLength({ min: 4 });
    req.checkBody('state', 'Invalid State Details').isString().isLength({ min: 4 });
    req.checkBody('qualification', 'Invalid Qualification Details').isString().isLength({ min: 4 });
    req.checkBody('experience', 'Invalid Experience Details').isString().isLength({ min: 4 });

    req.getValidationResult().then((err) => {
        if (err.isEmpty()) {
            userServices.editUser(req.body, (err, data) => {
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
