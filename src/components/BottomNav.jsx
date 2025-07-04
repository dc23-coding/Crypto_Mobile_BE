import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, CreditCard, Send, User, History } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/exchange', icon: TrendingUp, label: 'Exchange' },
    { path: '/send', icon: Send, label: 'Send' },
    { path: '/transactions', icon: History, label: 'History' },
    { path: '/cards', icon: CreditCard, label: 'Cards' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-pb"
    >
      <div className="max-w-md mx-auto lg:max-w-7xl px-2 sm:px-4">
        <div className="flex items-center justify-around h-16 sm:h-20">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center space-y-1 relative min-w-0 flex-1 py-2"
              >
                <div className={`p-2 rounded-lg transition-colors touch-manipulation ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground active:bg-muted'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-xs transition-colors truncate max-w-full ${
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;