// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/student/login', authController.studentLogin);
router.post('/dean/login', authController.deanLogin);
router.post('/student-b/login', authController.studentBLogin);

module.exports = router;
