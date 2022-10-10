const { Order, Cart, OrderItem, Menu } = require('../models');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.createOrder = async (req, res, next) => {
  try {
    const { orderId, totalPrice } = req.body;
    const userId = req.user.id;

    console.log('KUY');
    const userOrder = await Order.findOne({
      where: { payMentStatus: 'pending' }
    });
    if (userOrder) {
      throw new AppError('จ่ายตังก่อนอีสัส');
    }

    let slipUrl;
    console.log(req.file);
    if (req.file) {
      slipUrl = await cloudinary.upload(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const userCart = await Cart.findOne({ where: { userId }, include: Menu });

    const order = {
      userId,
      orderId,
      totalPrice,
      slipUrl,
      payMentStatus: 'pending'
    };

    const ordered = await Order.create(order);

    const newOrderItem = await OrderItem.create({
      amount: userCart.amount,
      priceWhenOrder: userCart.Menu.price,
      orderId: ordered.id,
      menuId: userCart.Menu.id
    });

    res.status(200).json({ newOrderItem });
  } catch (err) {
    next(err);
  }
};
