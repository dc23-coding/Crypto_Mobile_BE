// src/AuthContext.jsx
import { useWalletConnect } from '@/providers/WalletConnectProvider';
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const { account, connectWallet, disconnectWallet } = useWalletConnect();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    if (token) {
      api.get('/verify')
        .then((res) => setUser(res.data.user))
        .catch((error) => {
          console.error('Verification failed:', error);
          localStorage.removeItem('access_token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else if (account) {
      setUser({ walletAddress: account });
      localStorage.setItem('wallet_address', account);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [account]);

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    setUser(data.user);
    localStorage.setItem('access_token', data.token);
    return data;
  };

  const register = async (email, password, name) => {
    const { data } = await api.post('/register', { email, password, name });
    setUser(data.user);
    localStorage.setItem('access_token', data.token);
    return data;
  };

  const walletLogin = async () => {
    await connectWallet();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    await disconnectWallet();
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('wallet_address');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, walletLogin }}>
      {children}
    </AuthContext.Provider>
  );
};