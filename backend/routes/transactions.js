const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.get('/', transactionController.getUserTransactions);
router.post('/send', transactionController.sendMoney);
router.post('/buy-crypto', transactionController.buyCrypto);

module.exports = router;