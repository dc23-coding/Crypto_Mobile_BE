const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  cardHolder: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
  type: { type: String, enum: ['Visa', 'MasterCard'], default: 'Visa' },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);