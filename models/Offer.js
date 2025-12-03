const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  code: {
    type: String,
    unique: true,
    uppercase: true
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  },
  conditions: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicablePackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Offer', offerSchema);
