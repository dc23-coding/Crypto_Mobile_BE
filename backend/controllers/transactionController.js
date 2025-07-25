require('dotenv').config(); // For loading API keys
const CoinbasePro = require('coinbase-pro-node');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Initialize Coinbase Pro Client
const client = new CoinbasePro.AuthenticatedClient(
  process.env.API_KEY,
  process.env.API_SECRET,
  process.env.PASSPHRASE
);

// Get user transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', req.user.id)  // Use req.user.id instead of req.user._id
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

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

// Buy cryptocurrency using Coinbase API
exports.buyCrypto = async (req, res) => {
  try {
    const { coinId, amount } = req.body;
    
    // Check if coinId is valid (e.g., BTC, ETH, etc.)
    const validCoins = ['BTC', 'ETH', 'LTC', 'ADA', 'SOL']; // Add more coins as needed
    if (!validCoins.includes(coinId.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid coin ID' });
    }

    // Fetch the current price from Coinbase for the selected coin
    const coinPair = `${coinId}-USD`; // e.g., BTC-USD
    const ticker = await client.rest.product.getTicker(coinPair);

    if (!ticker) {
      return res.status(500).json({ message: `Error fetching price for ${coinId}` });
    }

    const price = parseFloat(ticker.price);
    const totalCost = amount * price; // Total cost for the transaction

    // Ensure the user has enough balance to complete the purchase
    if (req.user.balance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance to buy crypto' });
    }

    // Update user balance and crypto balance
    req.user.balance -= totalCost;
    req.user.bitcoinBalance += amount; // For simplicity, assuming they are buying BTC. Adjust for other coins.

    // Save the updated user information
    await req.user.save();

    // Record the crypto purchase transaction
    await Transaction.create({
      userId: req.user._id,
      type: 'crypto_buy',
      amount,
      currency: coinId.toUpperCase(),
      cryptoAmount: amount,
      usdAmount: totalCost,
      coinId,
      coinSymbol: coinId.toUpperCase()
    });

    // Respond with the updated balances
    res.json({ 
      balance: req.user.balance, 
      bitcoinBalance: req.user.bitcoinBalance, // Update this for the specific coin they bought
      message: `Successfully bought ${amount} ${coinId.toUpperCase()} for $${totalCost.toFixed(2)}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
