const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
 },
  email: { 
    type: String, 
    required: true, 
    unique: true,
 },
  password: { 
    type: String, 
    required: true,
 },
  mobileno: { 
    type: String, 
    required: true, 
    unique: true,
 },
  role: { 
    type: String, 
    default: 'student',
 },
  personal: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'personal',
 },
  education: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'education',
 }]
});

module.exports = mongoose.model('user', userSchema);
