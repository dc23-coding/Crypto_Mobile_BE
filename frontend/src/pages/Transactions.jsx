import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Bitcoin, Filter, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Transactions = () => {
  const { transactions } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = (filterType) => {
    toast({
      title: `🚧 Filter: ${filterType}`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleExport = () => {
    toast({
      title: "📊 Export Transactions",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      (transaction.from && transaction.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (transaction.to && transaction.to.toLowerCase().includes(searchTerm.toLowerCase())) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && transaction.type === filter;
  });

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'received':
        return <ArrowDownLeft className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'sent':
        return <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />;
      case 'crypto_buy':
        return <Bitcoin className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'received':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'sent':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
      case 'crypto_buy':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const getTransactionTitle = (transaction) => {
    switch (transaction.type) {
      case 'received':
        return `From ${transaction.from}`;
      case 'sent':
        return `To ${transaction.to}`;
      case 'crypto_buy':
        return 'Bitcoin Purchase';
      default:
        return 'Transaction';
    }
  };

  const getTransactionAmount = (transaction) => {
    if (transaction.type === 'crypto_buy') {
      return `${transaction.amount} ${transaction.currency}`;
    }
    return `$${transaction.amount.toFixed(2)}`;
  };

  const getTransactionAmountColor = (transaction) => {
    switch (transaction.type) {
      case 'received':
        return 'text-green-600 dark:text-green-400';
      case 'sent':
        return 'text-red-600 dark:text-red-400';
      case 'crypto_buy':
        return 'text-orange-600 dark:text-orange-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Transaction History</h1>
          <Button onClick={handleExport} variant="outline" size="sm" className="touch-manipulation">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 text-base"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
              className="whitespace-nowrap touch-manipulation"
            >
              All
            </Button>
            <Button
              variant={filter === 'received' ? 'default' : 'outline'}
              onClick={() => setFilter('received')}
              size="sm"
              className="whitespace-nowrap touch-manipulation"
            >
              Received
            </Button>
            <Button
              variant={filter === 'sent' ? 'default' : 'outline'}
              onClick={() => setFilter('sent')}
              size="sm"
              className="whitespace-nowrap touch-manipulation"
            >
              Sent
            </Button>
            <Button
              variant={filter === 'crypto_buy' ? 'default' : 'outline'}
              onClick={() => setFilter('crypto_buy')}
              size="sm"
              className="whitespace-nowrap touch-manipulation"
            >
              Crypto
            </Button>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Sent</p>
                  <p className="text-lg sm:text-xl font-bold text-red-600">
                    ${transactions
                      .filter(t => t.type === 'sent')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Received</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    ${transactions
                      .filter(t => t.type === 'received')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <ArrowDownLeft className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-1 col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Crypto Purchases</p>
                  <p className="text-lg sm:text-xl font-bold text-orange-600">
                    ${transactions
                      .filter(t => t.type === 'crypto_buy')
                      .reduce((sum, t) => sum + (t.usdAmount || 0), 0)
                      .toFixed(2)}
                  </p>
                </div>
                <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center justify-between text-lg sm:text-2xl">
              <span>All Transactions</span>
              <Button variant="ghost" size="sm" onClick={() => handleFilter('advanced')} className="touch-manipulation">
                <Filter className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                filteredTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted/70 active:bg-muted transition-colors touch-manipulation"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getTransactionColor(transaction.type)}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm sm:text-base truncate">{getTransactionTitle(transaction)}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className={`font-semibold text-sm sm:text-base ${getTransactionAmountColor(transaction)}`}>
                        {transaction.type === 'sent' ? '-' : '+'}
                        {getTransactionAmount(transaction)}
                      </p>
                      {transaction.type === 'crypto_buy' && transaction.usdAmount && (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          ${transaction.usdAmount.toFixed(2)}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground capitalize">
                        {transaction.status}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Transactions;