import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletConnectProvider } from '@/providers/WalletConnectProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletConnectProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WalletConnectProvider>
  </React.StrictMode>
);