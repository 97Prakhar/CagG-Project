const userServices = require('../services/userServices');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

/**
 * Required : Email, Password
 * Returns status, data/error
*/
exports.logIn = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Address').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 });

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

/**
 * Required : First Name, Last Name, Email, Password, Confirm Password
 * Returns status, data/error
*/
exports.register = (req, res) => {
    var response = {}

    req.checkBody('firstName', 'Invalid Name or Length of Name').isString().isLength({ min: 4 });
    req.checkBody('lastName', 'Invalid Name or Length of Name').isString().isLength({ min: 4 });
    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 }).equals(req.body.confirmPassword);
    // req.checkBody('role', 'Invalid Role').isString();

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
 * Required : Email, Password, Confirm Password
 * Returns status, (token, email)/error
*/
exports.authenticate = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Id').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 }).equals(req.body.confirmPassword);

    req.getValidationResult().then((err) => {
        if (err.isEmpty()) {
            userServices.getUserByMailId(req.body.email, (err, data) => {
                if (err) throw err;
                if (!data) {
                    response.status = false;
                    response.error = "User not found";
                    res.send(response);
                }

                userServices.comparePassword(req.body.password, data.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        const token = jwt.sign({ data: data }, config.secret, {
                            expiresIn: 604800 // 1 week
                        });
                        response.status = true;
                        response.data = {
                            token: 'JWT ' + token,
                            email: data.email
                        }
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
 * Required : Contact, Country, State, Technology, Mentor
 * Returns status, data/error
*/
exports.editUser = (req, res) => {
    var response = {}

    req.checkBody('contact', 'Invalid Contact Number').isString().isLength({ min: 10 });
    req.checkBody('country', 'Invalid Country').isString().isLength({ min: 3 });
    req.checkBody('state', 'Invalid State').isString().isLength({ min: 3 });
    req.checkBody('technology', 'Invalid Technology').isString().isLength({ min: 3 });
    req.checkBody('mentor', 'Invalid Mentor Name').isString().isLength({ min: 3 });

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
