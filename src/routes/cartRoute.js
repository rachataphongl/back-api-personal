const cartController = require('../controllers/cartController');

const express = require('express');

router = express.Router();

router.post('/shoppingcart', cartController.createCart);
router.delete('/deletecart/:cartId', cartController.deleteCart);
router.get('/getcart', cartController.getCart);

module.exports = router;
