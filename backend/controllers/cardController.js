const Card = require('../models/Card');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Get user's cards
exports.getUserCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user._id });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards, please try again.' });
  }
};

// Create new card
exports.createCard = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expiry, cvv, type } = req.body;

    // Validate card data
    if (!cardNumber || !cardHolder || !expiry || !cvv || !type) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Validate card number (e.g., basic check for 16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      return res.status(400).json({ message: 'Invalid card number. Must be 16 digits.' });
    }

    // Validate expiry date
    const currentDate = new Date();
    const [month, year] = expiry.split('/');
    const expiryDate = new Date(`20${year}-${month}-01`);
    if (expiryDate < currentDate) {
      return res.status(400).json({ message: 'Card expiry date has passed.' });
    }

    // Validate CVV (3 digits for Visa/MasterCard/AmEx)
    if (!/^\d{3,4}$/.test(cvv)) {
      return res.status(400).json({ message: 'Invalid CVV.' });
    }

    // Create new card
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
    res.status(500).json({ message: 'Error creating card, please try again.' });
  }
};

// Delete card
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card, please try again.' });
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

    // Check if user has enough balance
    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Top up card
    req.user.balance -= amount;
    card.balance += amount;
    
    // Save user and card data
    await Promise.all([req.user.save(), card.save()]);

    // Record transaction
    await Transaction.create({
      userId: req.user._id,
      type: 'card_topup',
      amount,
      cardId: card._id,
      timestamp: new Date()
    });

    res.json({
      message: 'Card top-up successful',
      balance: req.user.balance,
      cardBalance: card.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error topping up card, please try again.' });
  }
};
