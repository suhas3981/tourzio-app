const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Get all offers
router.get('/', offerController.getAllOffers);

// Validate offer code
router.post('/validate', offerController.validateOffer);

module.exports = router;
