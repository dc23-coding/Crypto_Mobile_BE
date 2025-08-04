
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

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const { data } = await api.get('/crypto');
        // Adapt Coinbase data to match mock structure
        const formattedData = Object.entries(data.data).map(([pair, info]) => ({
          id: pair.toLowerCase(),
          symbol: pair.split('-')[0],
          name: pair.split('-')[0], // Enhance with a mapping if needed
          price: parseFloat(info.amount),
          change: Math.random() * 10 - 5, // Placeholder; Coinbase needs historical data for this
          volume: 'N/A', // Add if Coinbase provides
          marketCap: 'N/A', // Add if Coinbase provides
        }));
        setCryptoData(formattedData.slice(0, 15)); // Top 15
      } catch (error) {
        console.error('Failed to fetch crypto data', error);
      }
    };
    fetchCryptoData();
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
