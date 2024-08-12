const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const {
    createFile,
    getFiles,
    updateFile,
    deleteFile,
    getAllUsers
} = require('../controllers/fileController');

const router = express.Router();

// Route to create a new file (Admin only)
router.post('/', verifyToken, authorizeRoles('admin'), createFile);

// Route to get all files (Admin & Student)
router.get('/', verifyToken, authorizeRoles('admin', 'student'), getFiles);

// Route to update a file (Admin only)
router.put('/:id', verifyToken, authorizeRoles('admin'), updateFile);

// Route to delete a file (Admin only)
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteFile);

// Route to get all students and admins (Admin only)
router.get('/users', verifyToken, authorizeRoles('admin'), getAllUsers);

module.exports = router;

