const mongoose = require('mongoose');
const Counter = require('./Counter');


const CampaignSchema = new mongoose.Schema({
  campaignId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  targeting: {
    locations: [{
      type: String,
      trim: true
    }],
    ageRange: {
      type: [Number],
      validate: {
        validator: function(arr) {
          return arr.length === 2 && arr[0] <= arr[1] && arr[0] >= 13 && arr[1] <= 100;
        },
        message: 'Age range must be [minAge, maxAge] where minAge >= 13 and maxAge <= 100'
      }
    },
    gender: { 
      type: String, 
      enum: ["Male", "Female", "All"],
      default: "All"
    }
  },
  status: {
    type: String,
    enum: [ "active", "paused", "completed"],
    default: "paused"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

//middleware to generate campaignId
CampaignSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Get user's campaign counter
      const counterName = `campaignId_${this.userId}`;
      const counter = await Counter.getNextSequence(counterName);
      this.campaignId = `${this.userId}C${counter}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Add indexes
CampaignSchema.index({ userId: 1 });
CampaignSchema.index({ campaignId: 1 });
CampaignSchema.index({ status: 1 });

module.exports = mongoose.model('Campaign', CampaignSchema);
