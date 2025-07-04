import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const handleNotifications = () => {
    toast({
      title: "🔔 Notifications",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleSettings = () => {
    toast({
      title: "⚙️ Settings",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-md mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">₿</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              CryptoCash
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative h-8 w-8 sm:h-10 sm:w-10"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotifications}
              className="relative h-8 w-8 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSettings}
              className="h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </Avatar>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;