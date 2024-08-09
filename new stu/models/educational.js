const mongoose = require('mongoose');

const educationalSchema = new mongoose.Schema({
    current: Boolean,
    education: {
        level: String,
        institute: {
            name: String,
            location: String
        },
        marks: String
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Students' }
});

module.exports = mongoose.model('Educational', educationalSchema);
