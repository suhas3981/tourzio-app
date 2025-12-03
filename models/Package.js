const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Trekking', 'Water Sports', 'Wildlife', 'Camping', 'Mountain Climbing', 'Desert Safari', 'Other'],
    required: true
  },
  duration: {
    type: Number, // in days
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxGroupSize: {
    type: Number,
    default: 10
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging', 'Expert'],
    default: 'Moderate'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: '/images/default-package.jpg'
  },
  highlights: [String],
  included: [String],
  excluded: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);
