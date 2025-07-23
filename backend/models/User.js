const mongoose = require('mongoose');
const Counter = require('./Counter');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true 
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});


UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this._wasNew = true; 
  }
  next();
});


// Post middleware to create wallet automatically
UserSchema.post('save', async function(doc, next) {
  // Only create wallet for new users using flag
  if (doc._wasNew) {
    try {
      const WalletModel = mongoose.model('Wallet');
      
      const newwallet = new WalletModel({
        userId: doc.userId,
        balance: 0
      });
      
      // Add initial transaction
      newwallet.addTransaction('credit', 0, 'Initial wallet creation');
      await newwallet.save();

    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  }
  next();
});



UserSchema.statics.generateUserId = async function() {
  try {
    const counter = await Counter.getNextSequence('userId');//'userId' is arugument ,not variable
    return (2025*10 + counter).toString(); // Starting from 20251
  } catch (error) {
    throw new Error('Failed to generate userId: ' + error.message);
  }
};

// Add indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ userId: 1 });

module.exports = mongoose.model('User', UserSchema);


/*
this.isNew or this is used -> document being created -> pre('save',f)

doc.isNEw or doc is used ->Just Saved document -> post('save',f)
*/