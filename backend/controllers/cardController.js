const Card = require('../models/Card');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get user's cards
exports.getUserCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user._id });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new card
exports.createCard = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiry, cvv, type } = req.body;
    const card = await Card.create({
      userId: req.user._id,
      cardNumber,
      cardHolder,
      expiry,
      cvv,
      type
    });
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete card
exports.deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Top up card balance
exports.topUpCard = async (req, res) => {
  try {
    const { amount } = req.body;
    const card = await Card.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Deduct from user balance
    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    req.user.balance -= amount;
    card.balance += amount;
    
    await Promise.all([req.user.save(), card.save()]);
    
    // Record transaction
    await Transaction.create({
      userId: req.user._id,
      type: 'card_topup',
      amount,
      cardId: card._id
    });

    res.json({ balance: req.user.balance, cardBalance: card.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};