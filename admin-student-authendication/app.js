const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/auth');
const fileRoute = require('./routes/file');
const registerRoute = require('./routes/register');
const protectedRoute = require('./routes/protected');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/files', fileRoute);
app.use('/api/register', registerRoute);
app.use('/api/protected', protectedRoute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
