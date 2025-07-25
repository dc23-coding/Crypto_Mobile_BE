const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');  // Optional: If you want to hash passwords manually
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// User registration (signup)
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the email is already registered
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create user in Supabase Auth
    const { user, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Create a record in the 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        { email, password, name, id: user.id }  // Store only the basic user info
      ]);

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    // Return the created user and the auth token
    const token = user.access_token;
    res.status(201).json({ token, user: userData[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Login with Supabase Auth
    const { user, error } = await supabase.auth.signIn({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Query user info from the 'users' table (using the Supabase auth user ID)
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) {
      return res.status(500).json({ message: userError.message });
    }

    // Return the user and token
    const token = user.access_token;
    res.json({ token, user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Protect routes (middleware to check if user is authenticated)
exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    // Verify the token using Supabase's auth system
    const { user, error } = await supabase.auth.api.getUser(token);

    if (error || !user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Attach user to the request object for use in other routes
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};
