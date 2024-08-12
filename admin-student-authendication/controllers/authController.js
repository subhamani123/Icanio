const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const Student = require('../models/student');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user is an admin
        let user = await Admin.findOne({ email });
        let role = 'admin';

        // If not found, check if the user is a student
        if (!user) {
            user = await Student.findOne({ email });
            role = 'student';
        }

        // If user is not found in either collection
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token and user info
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
