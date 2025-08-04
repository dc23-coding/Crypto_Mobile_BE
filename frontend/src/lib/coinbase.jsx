import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toaster } from '../components/ui/toaster';
import TradingBotWidget from '../components/ui/TradingBotWidget';
import axios from 'axios';
import { useCoinbasePrice } from './useCoinbasePrice';
import { mockSupabaseClient } from './supabase';

const mockUser = { id: 'mock-user-id' };

export default function TradingBotPage() {
  const [strategy, setStrategy] = useState({
    type: 'market',
    pair: 'BTC-USD',
    amount: '',
    side: 'buy',
    stopLoss: '',
    trailingStop: '',
    limitPrice: '',
  });
  const [strategies, setStrategies] = useState([]);
  const price = useCoinbasePrice(strategy.pair);
  const [lastPeak, setLastPeak] = useState(null);

  useEffect(() => {
    const fetchStrategies = async () => {
      const { data } = await mockSupabaseClient.from('bot_strategies').select('*').eq('user_id', mockUser.id);
      setStrategies(data || []);
    };
    fetchStrategies();
  }, []);

  useEffect(() => {
    if (strategy.trailingStop && price && lastPeak < price) {
      setLastPeak(price);
      const newStopLoss = price * (1 - parseFloat(strategy.trailingStop) / 100);
      console.log('New Stop Loss:', newStopLoss);
      setStrategies([...strategies, { ...strategy, stopLoss: newStopLoss }]);
    }
  }, [price, strategy, lastPeak]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/trading-bot/strategy`, {
        userId: mockUser.id,
        strategy,
      }, {
        headers: { Authorization: `Bearer mock-token` },
      });
      setStrategies([...strategies, strategy]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trading Bot</h2>
      <TradingBotWidget pair={strategy.pair} userId={mockUser.id} />
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md mt-4">
        <div className="mb-4">
          <label className="block mb-2">Order Type</label>
          <select
            value={strategy.type}
            onChange={(e) => setStrategy({ ...strategy, type: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop-loss">Stop-Loss</option>
          </select>
        </div>
        <Input
          placeholder="Pair (e.g., BTC-USD)"
          value={strategy.pair}
          onChange={(e) => setStrategy({ ...strategy, pair: e.target.value })}
          className="mb-4"
        />
        <Input
          placeholder="Amount"
          type="number"
          value={strategy.amount}
          onChange={(e) => setStrategy({ ...strategy, amount: e.target.value })}
          className="mb-4"
        />
        <div className="mb-4">
          <label className="block mb-2">Side</label>
          <select
            value={strategy.side}
            onChange={(e) => setStrategy({ ...strategy, side: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        {strategy.type === 'limit' && (
          <Input
            placeholder="Limit Price"
            type="number"
            value={strategy.limitPrice}
            onChange={(e) => setStrategy({ ...strategy, limitPrice: e.target.value })}
            className="mb-4"
          />
        )}
        {strategy.type === 'stop-loss' && (
          <Input
            placeholder="Stop Loss Price"
            type="number"
            value={strategy.stopLoss}
            onChange={(e) => setStrategy({ ...strategy, stopLoss: e.target.value })}
            className="mb-4"
          />
        )}
        <Input
          placeholder="Trailing Stop (%)"
          type="number"
          value={strategy.trailingStop}
          onChange={(e) => setStrategy({ ...strategy, trailingStop: e.target.value })}
          className="mb-4"
        />
        <Button type="submit" className="w-full">Save Strategy</Button>
      </form>
      <Toaster />
      <div className="mt-4">
        <h3 className="text-lg font-bold">Active Strategies</h3>
        {strategies.map((s, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded mt-2">
            <p>Type: {s.type}</p>
            <p>Pair: {s.pair}</p>
            <p>Amount: {s.amount}</p>
            <p>Side: {s.side}</p>
            {s.limitPrice && <p>Limit Price: {s.limitPrice}</p>}
            {s.stopLoss && <p>Stop Loss: {s.stopLoss}</p>}
            {s.trailingStop && <p>Trailing Stop: {s.trailingStop}%</p>}
          </div>
        ))}
      </div>
    </div>
  );
}