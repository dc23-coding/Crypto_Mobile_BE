import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Bitcoin } from 'lucide-react';
import { cn } from '@/lib/utils';

const CurrencyToggle = ({ value, onChange, className }) => {
  return (
    <div className={cn("relative bg-muted rounded-lg p-1 flex", className)}>
      <motion.div
        className="absolute inset-y-1 bg-background rounded-md shadow-sm"
        initial={false}
        animate={{
          x: value === 'usd' ? 0 : '100%',
          width: '50%'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      <button
        type="button"
        onClick={() => onChange('usd')}
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center space-x-2 py-2 px-4 text-sm font-medium transition-colors rounded-md",
          value === 'usd' 
            ? "text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <DollarSign className="h-4 w-4" />
        <span>USD</span>
      </button>
      
      <button
        type="button"
        onClick={() => onChange('crypto')}
        className={cn(
          "relative z-10 flex-1 flex items-center justify-center space-x-2 py-2 px-4 text-sm font-medium transition-colors rounded-md",
          value === 'crypto' 
            ? "text-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Bitcoin className="h-4 w-4" />
        <span>BTC</span>
      </button>
    </div>
  );
};

export default CurrencyToggle;