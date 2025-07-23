const mongoose = require('mongoose');

// Tracking Schema
const TrackingSchema = new mongoose.Schema({
  adId: {
    type: String, 
    required: true
  },
  campaignId: {
    type: String, 
    required: true
  },
  userSessionId: {
    type: String,
    required: true,
    trim: true
  },
  event: { 
    type: String, 
    enum: ["impression", "click", "conversion"],
    required: true
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  userMeta: {
    location: {
      type: String,
      trim: true
    },
    age: {
      type: Number,
      min: 13,
      max: 100
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      trim: true
    },
    ipAddress: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

TrackingSchema.index({ adId: 1, event: 1 });
TrackingSchema.index({ campaignId: 1, event: 1 });
TrackingSchema.index({ timestamp: -1 });
// 1 asc and -1 desc

module.exports = mongoose.model('Tracking', TrackingSchema);
