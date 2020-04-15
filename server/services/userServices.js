const bcrypt = require('bcryptjs');
const config = require('../config/config');
const userModel = require('../model/userModel');
const detailsModel = require('../model/detailsModel');

async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    if (hashedPassword) return hashedPassword;
}

async function verifyPassword(givenPassword, hashedPassword) {
    return await bcrypt.compare(givenPassword, hashedPassword);
}

exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

exports.getUserByMailId = (email, callback) => {
    userModel.findOne({ email: email }, async (err, user) => {
        if (!user) {
            err = "No user with the email found"
            callback(err);
        } else {
            callback(null, user);
        }
    });
}

exports.getUserByMentor = (mentorName, callback) => {
    userModel.findOne({ mentorName: mentorName }, async (err, user) => {
        if (!user) {
            err = "No user under the mentor found"
            callback(err);
        } else {
            callback(null, user);
        }
    });
}

exports.addUser = (body, callback) => {
    userModel.findOne({ email: body.email }, async (err, user) => {
        if (err) callback(err);
        if (user) {
            callback("Email already taken");
        } else {
            var user = new userModel({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: await generatePassword(body.password)
            });
            user.save((err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        }
    });
}

exports.logIn = (body, callback) => {
    userModel.findOne({ email: body.email }, async (err, user) => {
        if (!user) {
            err = "No User with this email exists"
            callback(err);
        } else {
            var validPass = await verifyPassword(body.password, user.password);

            if (!validPass) {
                callback("Invalid Password");
            } else {
                var token = tokenFactory.generateToken(user);
                callback(null, token);
            }
        }
    });
}
