const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.message = { type: 'error', text: 'Please login to continue' };
  res.redirect('/auth/login');
};

const isGuest = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/bookings/dashboard');
  }
  next();
};

module.exports = { isAuthenticated, isGuest };
