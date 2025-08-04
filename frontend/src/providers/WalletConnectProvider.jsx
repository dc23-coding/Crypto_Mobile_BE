// src/providers/WalletConnectProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import Onboard from '@web3-onboard/core';
import walletConnectModule from '@web3-onboard/walletconnect';
import injectedModule from '@web3-onboard/injected-wallets';

const WalletConnectContext = createContext();

export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext);
  if (!context) throw new Error('useWalletConnect must be used within a WalletConnectProvider');
  return context;
};

export const WalletConnectProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const onboard = Onboard({
    wallets: [
      walletConnectModule({
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
        version: '2.x',
      }),
      injectedModule(),
    ],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      },
      {
        id: 'solana:mainnet',
        token: 'SOL',
        label: 'Solana Mainnet',
        rpcUrl: 'https://api.mainnet-beta.solana.com',
      },
    ],
    appMetadata: {
      name: 'Crypto Xchange',
      description: 'Crypto trading platform',
    },
  });

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      if (walts[0]) {
        setAccount(wallets[0].accounts[0].address);
        setProvider(wallets[0].provider);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnectWallet = async () => {
    await onboard.disconnectWallet({ label: onboard.state.get().wallets[0]?.label });
    setAccount(null);
    setProvider(null);
  };

  return (
    <WalletConnectContext.Provider value={{ account, provider, connectWallet, disconnectWallet }}>
      {children}
    </WalletConnectContext.Provider>
  );
};