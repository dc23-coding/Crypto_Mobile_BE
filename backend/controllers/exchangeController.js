require('dotenv').config(); // Load environment variables

const CoinbasePro = require('coinbase-pro-node');

// Initialize Coinbase Pro Client
const client = new CoinbasePro.AuthenticatedClient(
  process.env.API_KEY, 
  process.env.API_SECRET, 
  process.env.PASSPHRASE
);

// Get real crypto data from Coinbase API
exports.getCryptoData = async (req, res) => {
  try {
    // Get real-time market data for top cryptocurrencies (use `getProductTicker` for real-time data)
    const products = await client.rest.product.getProducts();
    
    // Only select a subset of coins you're interested in
    const supportedCoins = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'ADA-USD', 'SOL-USD']; // Customize this list
    
    const cryptoData = [];

    for (const productId of supportedCoins) {
      const ticker = await client.rest.product.getTicker(productId); // Get real-time price data
      
      const coin = {
        symbol: productId.split('-')[0], // e.g., BTC, ETH, LTC
        price: ticker.price,
        change: ticker.change24h, // 24h price change
        volume: ticker.volume_24h, // 24h trading volume
        marketCap: ticker.last, // or use a custom calculation depending on the API response
      };

      cryptoData.push(coin);
    }

    res.json(cryptoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching crypto data from Coinbase' });
  }
};
