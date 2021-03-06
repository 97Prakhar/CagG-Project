const userModel = require('../model/userModel');
const detailsModel = require('../model/detailsModel');
const bcrypt = require('bcryptjs');

async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);

    if (hashedPassword) return hashedPassword;
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

exports.addUser = (body, callback) => {
    userModel.findOne({ email: body.email }, async (err, user) => {
        if (err) callback(err);
        if (user) {
            callback("Email Already Taken");
        } else {
            var user = new userModel({
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

exports.userDetails = (body, callback) => {
    detailsModel.findOne({ email: body.email }, async (err, user) => {
        if (err) {
            callback(err);
        } else if (user) {
            callback(null, user);
        } else if (!user) {
            err = "Add Details First";
            callback(err);
        }
    });
}

exports.editUser = (body, callback) => {
    detailsModel.findOne({ email: body.email }, async (err, user) => {
        if (err) {
            callback(err);
        } else if (user) {
            detailsModel.updateOne({ email: body.email }, {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    contact: body.contact,
                    country: body.country,
                    state: body.state,
                    education: body.education,
                    experience: body.experience,
                    projectDetails: body.projectDetails
                }
            }, { multi: true, new: true }, (err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        } else if (!user) {
            var user = new detailsModel({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                contact: body.contact,
                country: body.country,
                state: body.state,
                education: body.education,
                experience: body.experience,
                projectDetails: body.projectDetails
            });
            user.save((err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        }
    });
}
