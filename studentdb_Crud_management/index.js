const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// Import routes with correct names
const userrouter = require('./routers/userrouter');
const personalrouter = require('./routers/personalrouter');
const educationrouter = require('./routers/educationrouter');

const app = express();

app.use(bodyParser.json());

// Use the URI from the .env file if possible

const uri = "mongodb://localhost:27017/student";

mongoose.connect(uri)
  .then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Use routers for different routes
app.use('/api/users', userrouter);
app.use('/api/personal', personalrouter);
app.use('/api/education', educationrouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
