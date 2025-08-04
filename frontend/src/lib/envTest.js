import { config } from 'dotenv';
config();
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_KEY:', process.env.VITE_SUPABASE_KEY);
console.log('VITE_BACKEND_URL:', process.env.VITE_BACKEND_URL);