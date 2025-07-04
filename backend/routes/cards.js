const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.get('/', cardController.getUserCards);
router.post('/', cardController.createCard);
router.delete('/:id', cardController.deleteCard);
router.post('/:id/topup', cardController.topUpCard);

module.exports = router;