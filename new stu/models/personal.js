const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    address: {
        doorno: String,
        street: String,
        city: String,
        pin: String
    },
    biodata: {
        name: String,
        dob: Date,
        gender: String,
        native: String
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Students' }
});

module.exports = mongoose.model('Personal', personalSchema);
