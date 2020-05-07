const config = require('../config/config');
const userModel = require('../model/userModel');
const detailsModel = require('../model/detailsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// exports.getUserByMentor = (mentorName, callback) => {
//     detailsModel.findOne({ mentorName: mentorName }, async (err, user) => {
//         if (!user) {
//             err = "No user under the mentor found"
//             callback(err);
//         } else {
//             callback(null, user);
//         }
//     });
// }

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
                // role: body.role
            });
            user.save((err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        }
    });
}

exports.editUser = (body, callback) => {
    detailsModel.findOne({ email: body.email }, async (err, user) => {
        if (err) callback(err);
        else if (user) {
            detailsModel.updateOne({ email: body.email }, {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    contact: body.contact,
                    country: body.country,
                    state: body.state,
                    technology: body.technology,
                    //mentor: body.mentor
                }
            }, { multi: true, new: true }, (err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        }
        else {
            var user = new detailsModel({
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                contact: body.contact,
                country: body.country,
                state: body.state,
                technology: body.technology,
                //mentor: body.mentor
            });
            user.save((err, data) => {
                if (err) callback(err);
                else callback(null, data);
            });
        }
    });
}
