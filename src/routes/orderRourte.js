const orderController = require('../controllers/orderController');
const upload = require('../middlewares/upload');

const express = require('express');

const router = express.Router();

router.post(
  '/createorder',
  upload.single('slipUrl'),
  orderController.createOrder
);

router.get('/getallorders', orderController.getAllOrdered);
router.patch('/approved/order', orderController.conFirmOrder);
router.get('/:id', orderController.getOrderByUser);
//user
router.get('/user/:id', orderController.getOrderByUserId);
router.get('/orderedById', orderController.getOrderedByUserId);

module.exports = router;
