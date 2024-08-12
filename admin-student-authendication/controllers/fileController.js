const File = require('../models/file');
const Admin = require('../models/admin');
const Student = require('../models/student');

// Create a new file (Admin only)
const createFile = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newFile = new File({
            title,
            content,
            createdBy: req.user.id,
        });

        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all files (Admin & Student)
const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a file (Admin only)
const updateFile = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedFile = await File.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!updatedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.json(updatedFile);
    } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a file (Admin only)
const deleteFile = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFile = await File.findByIdAndDelete(id);

        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Server error' });
    }

};

// Get all students and admins (Admin only)
const getAllUsers = async (req, res) => {
    try {
        const students = await Student.find({});
        const admins = await Admin.find({});

        res.status(200).json({
            students,
            admins,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createFile, getFiles, updateFile, deleteFile, getAllUsers };
