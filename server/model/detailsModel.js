const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    mailId: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    technology: {
        type: String,
        required: true,
    },
    mentor: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('detailsModel', detailsSchema);

module.exports.getUserByMentor = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}
