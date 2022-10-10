const orderController = require('../controllers/orderController');
const upload = require('../middlewares/upload');

const express = require('express');

const router = express.Router();

router.post(
  '/createorder',
  upload.single('slipUrl'),
  orderController.createOrder
);

module.exports = router;
