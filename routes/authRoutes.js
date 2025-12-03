const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');
const { body } = require('express-validator');

// Login routes
router.get('/login', isGuest, authController.getLogin);
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], authController.postLogin);

// Signup routes
router.get('/signup', isGuest, authController.getSignup);
router.post('/signup', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number')
], authController.postSignup);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
