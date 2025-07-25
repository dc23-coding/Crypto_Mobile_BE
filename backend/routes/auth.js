const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const transactionController = require('./controllers/transactionController');
const cardController = require('./controllers/cardController');

// Protect routes with auth middleware
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/transactions', authController.protect, transactionController.getUserTransactions);
router.post('/cards', authController.protect, cardController.createCard);

// Add more routes as needed...

module.exports = router;
