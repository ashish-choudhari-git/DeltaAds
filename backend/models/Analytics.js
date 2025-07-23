const mongoose = require('mongoose');

//per campaign ,their will be analytical data
const AnalyticsSchema = new mongoose.Schema({
  campaignId: {
  type: String, 
  adId: {
    type: String, 
    },
  impressions: {
    type: Number,
    default: 0,
    min: 0
  },
  clicks: {
    type: Number,
    default: 0,
    min: 0
  },
  conversions: {
    type: Number,
    default: 0,
    min: 0
  },
  ctr: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  cpc: { // Cost Per Click
    type: Number,
    default: 0,
    min: 0
  },
  totalSpent: {
    type: Number,
    default: 0,
    min: 0
  },
  period: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }}
}, {
  timestamps: true
});


AnalyticsSchema.index({ campaignId: 1 });
AnalyticsSchema.index({ adId: 1 });
AnalyticsSchema.index({ 'period.start': 1, 'period.end': 1 });

// Calculate Click through rate before saving
AnalyticsSchema.pre('save', function(next) {
  if (this.impressions > 0) {
    this.ctr = this.clicks / this.impressions;
  }
  next();
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
