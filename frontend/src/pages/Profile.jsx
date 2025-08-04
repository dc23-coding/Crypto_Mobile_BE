
import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell, HelpCircle, LogOut, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleProfileAction = (action) => {
    toast({
      title: `🚧 ${action}`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const profileStats = [
    { label: 'Total Transactions', value: '47', icon: '📊' },
    { label: 'Bitcoin Earned', value: '0.0234 BTC', icon: '₿' },
    { label: 'Member Since', value: 'Jan 2024', icon: '📅' },
    { label: 'Verification Level', value: 'Verified', icon: '✅' }
  ];

  const menuItems = [
    { icon: Edit, label: 'Edit Profile', action: 'Edit Profile' },
    { icon: Shield, label: 'Security Settings', action: 'Security Settings' },
    { icon: Bell, label: 'Notifications', action: 'Notifications' },
    { icon: HelpCircle, label: 'Help & Support', action: 'Help & Support' },
    { icon: Settings, label: 'App Settings', action: 'App Settings' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                    Verified Account
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    Premium Member
                  </span>
                </div>
              </div>
              <Button onClick={() => handleProfileAction('Edit Profile')} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {profileStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Account Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications for transactions</p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={() => handleProfileAction('Push Notifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Bitcoin Rewards</p>
                <p className="text-sm text-muted-foreground">Automatically round up purchases</p>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={() => handleProfileAction('Bitcoin Rewards')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Switch
                onCheckedChange={() => handleProfileAction('Two-Factor Authentication')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleProfileAction(item.action)}
                  className="w-full justify-start h-12"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="destructive"
              onClick={() => handleProfileAction('Logout')}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
