const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authenticate, authorize } = require('../middleware/auth');

// Public route
router.post('/', reservationController.createReservation);

// Protected admin routes
router.get('/', authenticate, authorize('admin', 'staff'), reservationController.getReservations);
router.patch('/:id/status', authenticate, authorize('admin', 'staff'), reservationController.updateReservationStatus);

module.exports = router;