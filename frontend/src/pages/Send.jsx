import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send as SendIcon, Users, QrCode, DollarSign, Bitcoin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CurrencyToggle from '@/components/CurrencyToggle';
import { toast } from '@/components/ui/use-toast';

const Send = () => {
  const { user, addTransaction, updateBalance } = useAuth();
  const [sendType, setSendType] = useState('usd'); // 'usd' or 'crypto'
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const recentContacts = [
    { id: '1', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', lastSent: '$50.00' },
    { id: '2', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', lastSent: '$25.00' },
    { id: '3', name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', lastSent: '$100.00' },
    { id: '4', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', lastSent: '$75.00' }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      toast({
        title: "❌ Error",
        description: "Please fill in all required fields"
      });
      return;
    }

    const sendAmount = parseFloat(amount);
    if (sendAmount <= 0) {
      toast({
        title: "❌ Error",
        description: "Amount must be greater than 0"
      });
      return;
    }

    if (sendType === 'usd' && sendAmount > user.balance) {
      toast({
        title: "❌ Insufficient Funds",
        description: "You don't have enough balance for this transaction"
      });
      return;
    }

    if (sendType === 'crypto' && sendAmount > user.bitcoinBalance) {
      toast({
        title: "❌ Insufficient Bitcoin",
        description: "You don't have enough Bitcoin for this transaction"
      });
      return;
    }

    // Add transaction
    const transaction = {
      type: 'sent',
      amount: sendAmount,
      currency: sendType === 'usd' ? 'USD' : 'BTC',
      to: recipient,
      note: note || undefined
    };

    addTransaction(transaction);

    // Update balance
    if (sendType === 'usd') {
      updateBalance(-sendAmount);
    }

    // Reset form
    setRecipient('');
    setAmount('');
    setNote('');

    toast({
      title: "✅ Money Sent!",
      description: `Successfully sent ${sendType === 'usd' ? '$' : ''}${sendAmount}${sendType === 'crypto' ? ' BTC' : ''} to ${recipient}`
    });
  };

  const handleQuickSend = (contact) => {
    setRecipient(contact.name);
  };

  const handleQRCode = () => {
    toast({
      title: "📱 QR Code Scanner",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleRequestMoney = () => {
    toast({
      title: "💰 Request Money",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Money</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Button
            onClick={handleQRCode}
            className="h-14 sm:h-16 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white flex flex-col items-center justify-center space-y-1 touch-manipulation"
          >
            <QrCode className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm">Scan QR</span>
          </Button>
          <Button
            onClick={handleRequestMoney}
            className="h-14 sm:h-16 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white flex flex-col items-center justify-center space-y-1 touch-manipulation"
          >
            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm">Request</span>
          </Button>
        </div>

        {/* Send Form */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-2xl">
              <SendIcon className="h-5 w-5" />
              <span>Send Money</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSend} className="space-y-4 sm:space-y-6">
              {/* Currency Type Toggle */}
              <div>
                <label className="text-sm font-medium mb-3 block">Send</label>
                <CurrencyToggle 
                  value={sendType} 
                  onChange={setSendType}
                  className="w-full"
                />
              </div>

              {/* Available Balance */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-lg font-semibold">
                  {sendType === 'usd' 
                    ? `$${user.balance.toLocaleString()}` 
                    : `${user.bitcoinBalance} BTC`
                  }
                </p>
              </div>

              {/* Recipient */}
              <div>
                <label className="text-sm font-medium block mb-2">To</label>
                <Input
                  placeholder="Enter name, email, or phone number"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-sm font-medium block mb-2">Amount</label>
                <div className="relative">
                  <Input
                    type="number"
                    step={sendType === 'usd' ? '0.01' : '0.00000001'}
                    placeholder={sendType === 'usd' ? '0.00' : '0.00000000'}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`h-12 text-base ${sendType === 'usd' ? 'pl-8' : 'pr-12'}`}
                    required
                  />
                  {sendType === 'usd' && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                  )}
                  {sendType === 'crypto' && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                      BTC
                    </span>
                  )}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="text-sm font-medium block mb-2">Note (Optional)</label>
                <Input
                  placeholder="What's this for?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <Button type="submit" className="w-full bg-primary h-12 text-base touch-manipulation">
                <SendIcon className="h-4 w-4 mr-2" />
                Send {sendType === 'usd' ? 'Money' : 'Bitcoin'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-2xl">
              <Users className="h-5 w-5" />
              <span>Recent Contacts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {recentContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleQuickSend(contact)}
                  className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted/70 active:bg-muted cursor-pointer transition-colors touch-manipulation"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <p className="font-medium text-xs sm:text-sm truncate max-w-full">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.lastSent}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Send;