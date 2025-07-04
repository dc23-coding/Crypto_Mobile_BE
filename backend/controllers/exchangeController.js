const axios = require('axios');

// Get real crypto data from CoinGecko API
exports.getCryptoData = async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    
    const cryptoData = response.data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      price: coin.current_price,
      change: coin.price_change_percentage_24h,
      volume: coin.total_volume,
      marketCap: coin.market_cap
    }));
    
    res.json(cryptoData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crypto data' });
  }
};