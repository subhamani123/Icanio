const express = require('express');
const mongoose = require('mongoose')
 const app = express();
 const authRoutes = require('./routes/auth');
 const protectedRoute = require('./routes/protectedRoute');
 app.use(express.json());
 app.use('/auth', authRoutes);
 app.use('/protected', protectedRoute);


 const uri = "mongodb://localhost:27017/authendication";
 mongoose.connect(uri)
  .then(() => {
  console.log('Connected to MongoDB');
  const PORT = 3000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});