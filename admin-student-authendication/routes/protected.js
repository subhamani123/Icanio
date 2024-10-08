const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// Example of a protected route
router.get('/', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed successfully' });
});

// Example of an admin-only protected route
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Admin route accessed successfully' });
});

module.exports = router;
