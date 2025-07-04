const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

router.get('/crypto', exchangeController.getCryptoData);

module.exports = router;