const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isAuthenticated } = require('../middleware/auth');

// Dashboard
router.get('/dashboard', isAuthenticated, bookingController.getDashboard);

// Create booking
router.post('/create', isAuthenticated, bookingController.createBooking);

// Cancel booking
router.post('/:id/cancel', isAuthenticated, bookingController.cancelBooking);

module.exports = router;
