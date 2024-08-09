const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/createUser', studentController.createUser);
router.get('/education/:userId', studentController.getEducation);
router.post('/educationpost/:userId', studentController.postEducation);
router.get('/students', studentController.getAllStudents);
router.get('/students/:userId', studentController.getStudent);
router.put('/studentsupdate/:id', studentController.updateStudent);

module.exports = router;
