const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('File', fileSchema);
