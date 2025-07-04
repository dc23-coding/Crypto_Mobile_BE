import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Bitcoin, TrendingUp, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, transactions } = useAuth();

  const handleQuickAction = (action) => {
    toast({
      title: `🚧 ${action}`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="gradient-bg text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20"></div>
          <CardHeader className="relative z-10 pb-3 sm:pb-6">
            <CardTitle className="text-white/80 text-sm font-medium">Total Balance</CardTitle>
            <div className="text-2xl sm:text-3xl font-bold">${user.balance.toLocaleString()}</div>
          </CardHeader>
          <CardContent className="relative z-10 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Bitcoin Balance</p>
                <p className="text-lg sm:text-xl font-semibold">{user.bitcoinBalance} BTC</p>
              </div>
              <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-300" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 sm:gap-4"
      >
        <Button
          onClick={() => handleQuickAction('Send Money')}
          className="h-14 sm:h-16 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white flex flex-col items-center justify-center space-y-1 touch-manipulation"
        >
          <ArrowUpRight className="h-5 w-5" />
          <span className="text-sm">Send</span>
        </Button>
        <Button
          onClick={() => handleQuickAction('Request Money')}
          className="h-14 sm:h-16 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white flex flex-col items-center justify-center space-y-1 touch-manipulation"
        >
          <ArrowDownLeft className="h-5 w-5" />
          <span className="text-sm">Request</span>
        </Button>
      </motion.div>

      {/* Bitcoin Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 text-lg sm:text-2xl">
              <Gift className="h-5 w-5" />
              <span>Bitcoin Rewards</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3">
              Earn Bitcoin on every purchase! Round up your spending to the nearest dollar.
            </p>
            <Button
              onClick={() => handleQuickAction('Bitcoin Rewards')}
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 touch-manipulation"
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center justify-between text-lg sm:text-2xl">
              <span>Recent Activity</span>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 pt-0">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 touch-manipulation">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.type === 'received' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                    transaction.type === 'sent' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                    'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                  }`}>
                    {transaction.type === 'received' ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : transaction.type === 'sent' ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <Bitcoin className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {transaction.type === 'received' ? `From ${transaction.from}` :
                       transaction.type === 'sent' ? `To ${transaction.to}` :
                       'Bitcoin Purchase'}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold text-sm sm:text-base ${
                    transaction.type === 'received' ? 'text-green-600 dark:text-green-400' :
                    transaction.type === 'sent' ? 'text-red-600 dark:text-red-400' :
                    'text-orange-600 dark:text-orange-400'
                  }`}>
                    {transaction.type === 'crypto_buy' 
                      ? `${transaction.amount} ${transaction.currency}`
                      : `$${transaction.amount.toFixed(2)}`
                    }
                  </p>
                  {transaction.type === 'crypto_buy' && (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      ${transaction.usdAmount.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;