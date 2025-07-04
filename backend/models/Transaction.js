const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['sent', 'received', 'crypto_buy', 'crypto_sell', 'card_topup'], 
    required: true 
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  cryptoAmount: Number,
  usdAmount: Number,
  from: String,
  to: String,
  coinId: String,
  coinSymbol: String,
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);