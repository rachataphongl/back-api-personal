const cartController = require('../controllers/cartController');

const express = require('express');

const router = express.Router();

router.post('/shoppingcart', cartController.createCart);
router.delete('/deletecart/:cartId', cartController.deleteCart);
router.get('/getcart', cartController.getCart);
router.patch('/updateamount', cartController.updateAmountCart);
// router.patch('/decreaseamount', cartController.decreaseAmountCart);

module.exports = router;
