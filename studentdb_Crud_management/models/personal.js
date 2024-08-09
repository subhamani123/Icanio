const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  address: { 
    doorno: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  bioData: { 
    dob: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true }
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' 
  }
});

module.exports = mongoose.model('personal', personalSchema);
