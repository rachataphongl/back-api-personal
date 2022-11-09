const fs = require('fs');
const AppError = require('../utils/appError');
const { Menu, Cart } = require('../models');
const cloudinary = require('../utils/cloudinary');
const { Op } = require('sequelize');

exports.postMenu = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const { name, price, description } = req.body;
      // console.log(req.file);

      if (!name || !name.trim()) {
        throw new AppError('name is required');
      }

      if (!price) {
        throw new AppError('price is required');
      }

      if (!description) {
        throw new AppError('description is required');
      }
      // console.log(req.file);
      // const data = req.file;

      let imagePath;
      if (req.file) {
        // console.log(req.file);
        imagePath = await cloudinary.upload(req.file.path);
        fs.unlinkSync(req.file.path); //  ลบไฟล์ออกจากเครื่องหลังอัพโหลดเข้า cloudinary
      }

      const menu = await Menu.create({
        name,
        price,
        description,
        imagePath
      });
      return res.status(200).json({ menu });
    }
    res.status(401).json('no no no no no noooooo');
  } catch (err) {
    next(err);
  }
};

exports.getMenu = async (req, res, next) => {
  try {
    if (req?.user) {
      const findCartItems = await Cart.findAll({
        where: {
          userId: req.user.id
        }
      });

      const newCartItems = JSON.parse(JSON.stringify(findCartItems)).map(
        (el) => el.menuId
      );
      console.log(newCartItems);
      const menuItems = await Menu.findAll({
        where: {
          id: { [Op.notIn]: newCartItems }
        }
      });

      // const filteredMenu = JSON.parse(JSON.stringify(menuItems)).filter(
      //   (el) => el.id === JSON.parse(JSON.stringify(findCartItems)).menuId
      // );

      return res.status(200).json({ menuItems });
    }
    res.status(401).json('KUY');
  } catch (err) {
    next(err);
  }
};

exports.deleteMenu = async (req, res, next) => {
  try {
    if ((req.user.role = 'admin')) {
      const { id } = req.params;

      await Menu.destroy({ where: { id } });
      return res.status(201).json({ message: 'success delete' });
    }
    res.status(401).json('no no no no no noooooo');
  } catch (err) {
    next(err);
  }
};

exports.editMenu = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      console.log('roleeeeeeeeeeee', req.user.role);
      const { name, description, price } = req.body;
      const { id } = req.params;
      console.log('eiei');
      const updated = {};

      if (name) {
        updated.name = name;
      }

      if (description) {
        updated.description = description;
      }

      if (price) {
        updated.price = price;
      }

      let imagePath;
      // console.log(req.file);
      if (req.file) {
        imagePath = await cloudinary.upload(req.file.path);
        // console.log(imagePath);
        const removeFileFromMac = fs.unlinkSync(req.file.path);
      }

      if (imagePath) {
        updated.imagePath = imagePath;
      }
      await Menu.update(updated, { where: { id } });

      console.log(updated, '**********************');
      // const trueItemUpdated = await Menu.findOne({ where: { id } });
      // console.log(trueItemUpdated, 'KUY MAE YEF');
      // console.log(itemUpdate);
      return res.status(200).json({ message: 'updated sed rav i heer' });
    }
    res.status(401).json(' no no no noooooooo!!!!!!');
  } catch (err) {
    next(err);
  }
};
