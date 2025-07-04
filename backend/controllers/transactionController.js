const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Get user transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort('-date');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send money to another user
exports.sendMoney = async (req, res) => {
  try {
    const { email, amount } = req.body;
    
    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const receiver = await User.findOne({ email });
    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update balances
    req.user.balance -= amount;
    receiver.balance += amount;
    
    await Promise.all([req.user.save(), receiver.save()]);
    
    // Record transactions
    await Promise.all([
      Transaction.create({
        userId: req.user._id,
        type: 'sent',
        amount,
        to: receiver.email
      }),
      Transaction.create({
        userId: receiver._id,
        type: 'received',
        amount,
        from: req.user.email
      })
    ]);

    res.json({ balance: req.user.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buy cryptocurrency
exports.buyCrypto = async (req, res) => {
  try {
    const { coinId, amount, price } = req.body;
    const totalCost = amount * price;
    
    if (req.user.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    req.user.balance -= totalCost;
    req.user.bitcoinBalance += amount;
    
    await req.user.save();
    
    // Record transaction
    await Transaction.create({
      userId: req.user._id,
      type: 'crypto_buy',
      amount: amount,
      currency: coinId.toUpperCase(),
      cryptoAmount: amount,
      usdAmount: totalCost,
      coinId,
      coinSymbol: coinId.toUpperCase()
    });

    res.json({ 
      balance: req.user.balance, 
      bitcoinBalance: req.user.bitcoinBalance 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};