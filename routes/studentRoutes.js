// routes/studentRoutes.js
const express = require('express');
const studentController = require('../controllers/studentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/sessions', requireAuth, studentController.fetchFreeSessionsForStudentB);
router.post('/book', requireAuth, studentController.studentBBookSession);

module.exports = router;
