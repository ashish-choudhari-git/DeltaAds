const mongoose = require('mongoose');
const Counter = require('./Counter');


const AdSchema = new mongoose.Schema({
  adId: {
    type: String,
    unique: true,
    required: true
  },
  campaignId: {
    type: String, 
    unique: false,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  mediaType: { 
    type: String, 
    enum: ["image", "video"],
    required: true
  },
  targetUrl: {
    type: String,
    required: true,
    trim: true
  },
  shortDesc: {
    type: String,
    required: true,
    trim: true
  },
  longDesc: {
    type: String,
    required: true,
    trim: true
  },
  visitLabel: {
    type: String,
    trim: true
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

//this middleware runs before doc is save to database
// this.isNew this-> current document being saved
AdSchema.pre('save', async function(next) {
 
  if (this.isNew) {
    try {
      const counterName = `adId_${this.campaignId}`;
      const counter = await Counter.getNextSequence(counterName);
      this.adId = counter.toString().padStart(4, '0'); 
    } catch (error) {
      return next(error);
    }
  }
  next(); //this will continue save operation
});


AdSchema.index({ campaignId: 1 });
AdSchema.index({ adId: 1 });
AdSchema.index({ active: 1 }); 

module.exports = mongoose.model('Ad', AdSchema);
