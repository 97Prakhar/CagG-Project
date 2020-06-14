const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    education: {
        type: Array,
        required: true
    },
    experience: {
        type: Array,
        required: true
    },
    projectDetails: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('detailsModel', detailsSchema);
