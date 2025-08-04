import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useCoinbasePrice } from '../../lib/useCoinbasePrice';

const mockCandles = [
  { time: Math.floor(Date.now() / 1000) - 3600, open: 50000, high: 50500, low: 49500, close: 50200 },
  { time: Math.floor(Date.now() / 1000), open: 50200, high: 51000, low: 50000, close: 50800 },
];

export default function TradingBotWidget({ pair }) {
  const chartContainerRef = useRef();
  const price = useCoinbasePrice(pair);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      timeScale: { timeVisible: true, secondsVisible: false },
    });
    const series = chart.addCandlestickSeries();
    series.setData(mockCandles);
    return () => chart.remove();
  }, [pair]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h3 className="text-lg font-bold">Market: {pair}</h3>
      <p>Current Price: {price || 'Loading...'}</p>
      <div ref={chartContainerRef} />
    </div>
  );
}