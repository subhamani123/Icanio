const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    role: String,
    personaldet: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal' },
    educationaldet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Educational' }]
});

module.exports = mongoose.model('Students', studentSchema);
