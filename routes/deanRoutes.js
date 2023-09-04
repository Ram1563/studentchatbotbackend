// routes/deanRoutes.js
const express = require('express');
const deanController = require('../controllers/deanController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/pending-sessions', deanController.fetchPendingSessions);
router.get('/all-pending-sessions', deanController.fetchAllPendingSessions);
router.get('/pending-sessions-after-slot-time', deanController.fetchDeanPendingSessionsAfterSlotTime);

module.exports = router;
