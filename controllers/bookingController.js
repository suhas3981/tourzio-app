const Booking = require('../models/Booking');
const Package = require('../models/Package');
const Offer = require('../models/Offer');

exports.getDashboard = async (req, res) => {
  try {
    const upcomingBookings = await Booking.find({
      user: req.session.user.id,
      status: { $in: ['pending', 'confirmed'] },
      startDate: { $gte: new Date() }
    })
    .populate('package')
    .sort({ startDate: 1 });

    const pastBookings = await Booking.find({
      user: req.session.user.id,
      $or: [
        { status: 'completed' },
        { status: 'cancelled' },
        { startDate: { $lt: new Date() } }
      ]
    })
    .populate('package')
    .sort({ startDate: -1 });

    res.render('dashboard', { 
      upcomingBookings, 
      pastBookings 
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.render('dashboard', { 
      upcomingBookings: [], 
      pastBookings: [],
      error: 'Failed to load bookings' 
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { packageId, startDate, numberOfPeople, specialRequests } = req.body;
    
    const package = await Package.findById(packageId);
    
    if (!package) {
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found' 
      });
    }

    let totalPrice = package.price * numberOfPeople;
    let discountsApplied = [];

    // Apply group discount
    if (numberOfPeople >= 4) {
      totalPrice *= 0.85; // 15% off
      discountsApplied.push('Group Discount (15%)');
    }

    // Apply student discount
    if (req.session.user.isStudent) {
      totalPrice *= 0.90; // 10% off
      discountsApplied.push('Student Discount (10%)');
    }

    // Check early bird discount (60+ days in advance)
    const daysInAdvance = (new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24);
    if (daysInAdvance >= 60) {
      totalPrice *= 0.80; // 20% off
      discountsApplied.push('Early Bird Discount (20%)');
    }

    const booking = new Booking({
      user: req.session.user.id,
      package: packageId,
      startDate,
      numberOfPeople,
      totalPrice: Math.round(totalPrice),
      specialRequests,
      discountsApplied
    });

    await booking.save();

    res.json({ 
      success: true, 
      message: 'Booking created successfully',
      bookingId: booking._id 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking' 
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.session.user.id
    });

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ 
      success: true, 
      message: 'Booking cancelled successfully' 
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cancel booking' 
    });
  }
};
