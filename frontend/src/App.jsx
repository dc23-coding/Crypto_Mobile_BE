import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Exchange from '@/pages/Exchange';
import Transactions from '@/pages/Transactions';
import Cards from '@/pages/Cards';
import Send from '@/pages/Send';
import Profile from '@/pages/Profile';
import LoginPage from '@/pages/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage'; 
import TradingBotPage from './pages/TradingBotPage';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Helmet>
            <title>CryptoCash - Digital Wallet & DEX Exchange</title>
            <meta name="description" content="Send money, trade crypto, and earn Bitcoin rewards with CryptoCash - the modern digital wallet platform." />
          </Helmet>
          <Layout>
            <Routes>
              {/* Redirect to Login if not logged in */}
              <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />

              {/* Authentication routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} /> {/* Add this route */}

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/exchange" element={<ProtectedRoute element={<Exchange />} />} />
              <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
              <Route path="/cards" element={<ProtectedRoute element={<Cards />} />} />
              <Route path="/send" element={<ProtectedRoute element={<Send />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/trading-bot" element={<TradingBotPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;