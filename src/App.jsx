
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Exchange from '@/pages/Exchange';
import Transactions from '@/pages/Transactions';
import Cards from '@/pages/Cards';
import Send from '@/pages/Send';
import Profile from '@/pages/Profile';

function App() {
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/send" element={<Send />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
