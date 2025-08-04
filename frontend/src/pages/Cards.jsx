
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, MoreVertical, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Cards = () => {
  const { cards, addCard } = useAuth();
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.name) {
      toast({
        title: "❌ Error",
        description: "Please fill in all card details"
      });
      return;
    }

    const cardData = {
      type: 'debit',
      last4: newCard.number.slice(-4),
      brand: getBrandFromNumber(newCard.number),
      isDefault: cards.length === 0,
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      name: newCard.name
    };

    addCard(cardData);
    setNewCard({ number: '', expiryMonth: '', expiryYear: '', cvv: '', name: '' });
    setShowAddCard(false);
    
    toast({
      title: "✅ Card Added",
      description: "Your card has been successfully added!"
    });
  };

  const getBrandFromNumber = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Unknown';
  };

  const handleCardAction = (action, card) => {
    toast({
      title: `🚧 ${action}`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setNewCard(prev => ({ ...prev, number: formatted }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Payment Cards</h1>
          <Button onClick={() => setShowAddCard(true)} className="bg-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </div>

        {/* Card Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">Bank-level security for all transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-orange-600 dark:text-orange-400">Bitcoin Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earn Bitcoin on every purchase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Existing Cards */}
        <div className="space-y-4 mb-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 relative">
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCardAction('Card Options', card)}
                        className="text-white hover:bg-white/20"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8">
                      <CreditCard className="h-8 w-8" />
                      <span className="text-lg font-semibold">{card.brand}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-80">Card Number</p>
                        <p className="text-xl font-mono">•••• •••• •••• {card.last4}</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm opacity-80">Expires</p>
                          <p className="font-mono">{card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Type</p>
                          <p className="capitalize">{card.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    {card.isDefault && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-muted/50">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCardAction('Set as Default', card)}
                        disabled={card.isDefault}
                      >
                        {card.isDefault ? 'Default Card' : 'Set Default'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCardAction('Freeze Card', card)}
                      >
                        Freeze
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCardAction('Remove Card', card)}
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add New Card Form */}
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Add New Card</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Cardholder Name</label>
                    <Input
                      placeholder="John Doe"
                      value={newCard.name}
                      onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Card Number</label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Month</label>
                      <Input
                        placeholder="MM"
                        value={newCard.expiryMonth}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiryMonth: e.target.value }))}
                        maxLength={2}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Year</label>
                      <Input
                        placeholder="YYYY"
                        value={newCard.expiryYear}
                        onChange={(e) => setNewCard(prev => ({ ...prev, expiryYear: e.target.value }))}
                        maxLength={4}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">CVV</label>
                      <Input
                        placeholder="123"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Add Card
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddCard(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {cards.length === 0 && !showAddCard && (
          <Card className="text-center py-12">
            <CardContent>
              <CreditCard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Cards Added</h3>
              <p className="text-muted-foreground mb-4">
                Add your first payment card to start making purchases and earning Bitcoin rewards.
              </p>
              <Button onClick={() => setShowAddCard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Card
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Cards;
