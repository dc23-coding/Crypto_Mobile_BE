
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Exchange = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoData, setCryptoData] = useState([]);

  // Mock crypto data for top 15 coins
  const mockCryptoData = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.5, volume: '28.5B', marketCap: '847B' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 2650.00, change: -1.2, volume: '15.2B', marketCap: '318B' },
    { id: 'tether', symbol: 'USDT', name: 'Tether', price: 1.00, change: 0.1, volume: '45.8B', marketCap: '91B' },
    { id: 'bnb', symbol: 'BNB', name: 'BNB', price: 315.50, change: 3.2, volume: '1.8B', marketCap: '47B' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', price: 98.75, change: 5.8, volume: '2.1B', marketCap: '42B' },
    { id: 'usdc', symbol: 'USDC', name: 'USD Coin', price: 1.00, change: 0.0, volume: '8.5B', marketCap: '25B' },
    { id: 'xrp', symbol: 'XRP', name: 'XRP', price: 0.62, change: -2.1, volume: '1.2B', marketCap: '33B' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.48, change: 1.8, volume: '450M', marketCap: '17B' },
    { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', price: 36.80, change: 4.2, volume: '680M', marketCap: '14B' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.085, change: -0.8, volume: '890M', marketCap: '12B' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 7.25, change: 2.1, volume: '320M', marketCap: '9B' },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', price: 0.92, change: 3.5, volume: '410M', marketCap: '8.5B' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', price: 14.80, change: 1.9, volume: '580M', marketCap: '8.2B' },
    { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', price: 72.50, change: -1.5, volume: '420M', marketCap: '5.4B' },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', price: 6.85, change: 2.8, volume: '180M', marketCap: '4.1B' }
  ];

  useEffect(() => {
    // Simulate real-time price updates
    setCryptoData(mockCryptoData);
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.02),
        change: coin.change + (Math.random() - 0.5) * 2
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredCrypto = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTrade = (coin, action) => {
    toast({
      title: `🚧 ${action} ${coin.symbol}`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">Crypto Exchange</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Market Cap</p>
                  <p className="text-xl font-bold">$1.7T</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-xl font-bold">$89.2B</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">BTC Dominance</p>
                  <p className="text-xl font-bold">49.8%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crypto List */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cryptocurrencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCrypto.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{coin.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{coin.name}</p>
                      <p className="text-sm text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-semibold">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className={`text-sm ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                    </p>
                  </div>

                  <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{coin.volume}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleTrade(coin, 'Buy')}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTrade(coin, 'Sell')}
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      Sell
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Exchange;
