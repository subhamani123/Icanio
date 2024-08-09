const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    enum: ["10th", "12th", "diploma", "ug", "pg"], // Enum to restrict the education levels
    default: "ug"
  },
  institute: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  marks: {
    type: Number,
    required: true,
  }
});

const studentEducationalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Ensure this matches the model name for user schema
    required: true
  },
  education: [educationSchema]
});

module.exports = mongoose.model('education', studentEducationalProfileSchema);
