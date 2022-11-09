const { Order, Cart, OrderItem, Menu, User } = require('../models');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const { Op } = require('sequelize');

exports.createOrder = async (req, res, next) => {
  try {
    if (req?.user) {
      const { orderId, totalPrice } = req.body;
      const userId = req.user.id;
      console.log(userId, '**************************');
      const userOrder = await Order.findOne({
        where: { [Op.and]: [{ payMentStatus: 'pending' }, { userId }] }
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

      const order = {
        userId,
        orderId,
        totalPrice,
        slipUrl,
        payMentStatus: 'pending'
      };
      const ordered = await Order.create(order);

      const userCart = await Cart.findAll({
        where: { userId },
        include: [{ model: Menu }]
      });

      for (let item of userCart) {
        item.orderId = ordered.id;
        console.log(item);
        await OrderItem.create({
          amount: item.amount,
          priceWhenOrder: item.Menu.price,
          orderId: item.orderId,
          menuId: item.Menu.id
        });
      }

      const clearCart = await Cart.destroy({ where: { userId } });

      return res.status(200).json({ clearCart });
    }
    res.status(401).json('You are not user');
  } catch (err) {
    next(err);
  }
};

exports.getAllOrdered = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { payMentStatus: 'pending' },
      include: [{ model: OrderItem, include: { model: Menu } }, { model: User }]
    });

    res.status(201).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderedByUserId = async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: { payMentStatus: 'pending' } });
  } catch (err) {
    next(err);
  }
};

exports.conFirmOrder = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { id } = req.body;

      console.log(req.body);

      const whichOneOrder = await Order.update(
        { payMentStatus: 'success' },
        { where: { id } }
      );

      // const selectUserId = whichOneOrder.userId

      // const confirmOrder = await Order.update({where: { payMentStatus: 'success'}, include: [{model: User}]})

      res.status(201).json('approved');
    }
    res.status(401).json('nonononononono');
  } catch (err) {
    next(err);
  }
};

exports.getOrderByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderByUser = await Order.findOne({
      where: { [Op.and]: [{ payMentStatus: 'pending' }, { userId }] }
    });
    console.log(orderByUser);
    res.status(201).json({ orderByUser });
  } catch (err) {
    next(err);
  }
};

exports.getOrderByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderById = await Order.findOne({
      where: { [Op.and]: [{ payMentStatus: 'pending' }, { userId }] },
      include: [{ model: OrderItem, include: { model: Menu } }, { model: User }]
      //include: [{ model: OrderItem, include: { model: Menu } }, { model: User }]
    });
    // console.log(orderById);
    res.status(201).json({ orderById });
  } catch (err) {
    next(err);
  }
};
