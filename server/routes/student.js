const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students
router.get('/', studentController.getAllStudents);

// POST new student
router.post('/', studentController.createStudent);

// PUT update student
router.put('/:id', studentController.updateStudent);

// DELETE student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;