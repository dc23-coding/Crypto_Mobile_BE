import { createClient } from '@supabase/supabase-js';

// Mock data for bot_strategies to bypass Supabase
const mockStrategies = [
  { id: 1, user_id: 'mock-user-id', strategy: { type: 'market', pair: 'BTC-USD', amount: '0.01', side: 'buy', trailingStop: '5' }, status: 'active' },
];

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Mock Supabase client for Trading Bot
export const mockSupabaseClient = {
  from: (table) => ({
    select: () => ({
      eq: () => ({
        single: () => ({ data: mockStrategies.find(s => s.user_id === 'mock-user-id'), error: null }),
      }),
      data: mockStrategies,
      error: null,
    }),
    insert: (data) => ({
      data: [{ id: mockStrategies.length + 1, ...data }],
      error: null,
    }),
  }),
};