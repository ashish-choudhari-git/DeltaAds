const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  },
  history: [{
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    balanceAfter: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});


WalletSchema.index({ userId: 1 });
WalletSchema.index({ "history.timestamp": -1 }); // For history queries

// Method to add transaction to history
WalletSchema.methods.addTransaction = function(type, amount, description) {
  const oldBalance = this.balance;
  
  if (type === "credit") {
    this.balance += amount;
  } else { //debit
    if (this.balance < amount) {
      throw new Error("Insufficient balance");
    }
    this.balance -= amount;
  } 
  
  this.history.push({
    type: type,
    amount: amount,
    description: description,
    balanceAfter: this.balance,
    timestamp: new Date()
  });
  
  this.lastUpdated = new Date();
  return this;//balance, history,lastupdated
};

module.exports = mongoose.model('Wallet', WalletSchema);
