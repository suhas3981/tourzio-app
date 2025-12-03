const Offer = require('../models/Offer');

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ 
      isActive: true,
      $or: [
        { validUntil: { $gte: new Date() } },
        { validUntil: null }
      ]
    }).sort({ createdAt: -1 });

    res.render('offers', { offers });
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.render('offers', { 
      offers: [],
      error: 'Failed to load offers' 
    });
  }
};

exports.validateOffer = async (req, res) => {
  try {
    const { code } = req.body;
    
    const offer = await Offer.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      $or: [
        { validUntil: { $gte: new Date() } },
        { validUntil: null }
      ]
    });

    if (!offer) {
      return res.json({ 
        success: false, 
        message: 'Invalid or expired offer code' 
      });
    }

    res.json({ 
      success: true, 
      discount: offer.discountPercentage,
      message: `${offer.discountPercentage}% discount applied!` 
    });
  } catch (error) {
    console.error('Error validating offer:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to validate offer' 
    });
  }
};
