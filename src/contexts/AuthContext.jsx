
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      balance: 2547.83,
      bitcoinBalance: 0.0234,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        type: 'received',
        amount: 150.00,
        currency: 'USD',
        from: 'Sarah Wilson',
        date: new Date().toISOString(),
        status: 'completed'
      },
      {
        id: '2',
        type: 'sent',
        amount: 75.50,
        currency: 'USD',
        to: 'Mike Johnson',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed'
      },
      {
        id: '3',
        type: 'crypto_buy',
        amount: 0.005,
        currency: 'BTC',
        usdAmount: 200.00,
        date: new Date(Date.now() - 172800000).toISOString(),
        status: 'completed'
      }
    ];
  });
const API_URL = 'http://localhost:5000/api'; // Backend URL

// Example: User login
const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
};
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('cards');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        type: 'debit',
        last4: '4532',
        brand: 'Visa',
        isDefault: true,
        expiryMonth: 12,
        expiryYear: 2027
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const updateBalance = (amount) => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'completed'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addCard = (card) => {
    const newCard = {
      ...card,
      id: Date.now().toString()
    };
    setCards(prev => [...prev, newCard]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      transactions,
      cards,
      updateBalance,
      addTransaction,
      addCard
    }}>
      {children}
    </AuthContext.Provider>
  );
};
