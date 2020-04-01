const mongoose = require('mongoose');
const User = mongoose.model('User');
const details = mongoose.model('detailsModel');

module.exports.login = (req, res, next) => {

}

module.exports.register = (req, res, next) => {
    var newUser = new User({
        fullName = req.body.fullName,
        email = req.body.email,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.confirmPassword = hash;
            if (password === confirmPassword) {
                newUser.save(callback);
            }
        });
    });
}

module.exports.addDetails = (req, res, next) => {
    var info = new details({
        name = req.body.name,
        surname = req.body.surname,
        mailId = req.body.mailId,
        contact = req.body.contact,
        country = req.body.country,
        state = req.body.state,
        technology = req.body.technology,
        mentor = req.body.mentor
    });

    info.save((err, doc) => {
        if (!err)
            res.send(doc);
    });
}
