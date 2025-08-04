import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TradingBotPage from '../pages/TradingBotPage';

describe('TradingBotPage', () => {
  it('renders trading bot form', () => {
    render(
      <MemoryRouter>
        <TradingBotPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Trading Bot')).toBeInTheDocument();
    expect(screen.getByText('Order Type')).toBeInTheTheDocument();
    expect(screen.getByPlaceholderText('Pair (e.g., BTC-USD)')).toBeInTheDocument();
  });
});