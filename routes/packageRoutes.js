const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Get all packages with filters
router.get('/', packageController.getAllPackages);

// Get package by ID
router.get('/:id', packageController.getPackageById);

module.exports = router;
