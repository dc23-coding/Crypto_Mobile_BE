import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-20 pt-16 min-h-screen">
        <div className="max-w-md mx-auto lg:max-w-7xl">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;