const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getLogin = (req, res) => {
  res.render('login', { errors: [] });
};

exports.postLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', { errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.render('login', { 
        errors: [{ msg: 'Invalid email or password' }] 
      });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.render('login', { 
        errors: [{ msg: 'Invalid email or password' }] 
      });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isStudent: user.isStudent
    };

    res.redirect('/bookings/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { 
      errors: [{ msg: 'An error occurred. Please try again.' }] 
    });
  }
};

exports.getSignup = (req, res) => {
  res.render('signup', { errors: [] });
};

exports.postSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('signup', { errors: errors.array() });
  }

  const { name, email, password, phone, isStudent } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.render('signup', { 
        errors: [{ msg: 'Email already registered' }] 
      });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      isStudent: isStudent === 'on'
    });

    await user.save();

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      isStudent: user.isStudent
    };

    res.redirect('/bookings/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', { 
      errors: [{ msg: 'An error occurred. Please try again.' }] 
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
};
