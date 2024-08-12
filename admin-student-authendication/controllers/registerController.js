const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const Student = require('../models/student');

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (role === 'admin') {
            newUser = new Admin({
                username,
                email,
                password: hashedPassword,
                role,
            });
        } else {
            newUser = new Student({
                username,
                email,
                password: hashedPassword,
                role: 'student',
            });
        }

        // Save the user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };
