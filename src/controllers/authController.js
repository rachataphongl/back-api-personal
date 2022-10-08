// require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { User } = require('../models');
const { Op } = require('sequelize');
// const Op = require('Sequelize').Op;

const genToken = (payload) => {
  // console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'key', {
    expiresIn: process.env.JWT_EXPIRES || '2d'
  });
};

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      address,
      phoneNumber,
      email,
      role,
      password,
      confirmPassword
    } = req.body;

    if (!firstName || !firstName.trim()) {
      throw new AppError('first name is require', 400);
    }

    if (!lastName || !lastName.trim()) {
      throw new AppError('first name is required', 400);
    }

    if (!username) {
      throw new AppError('username is require', 400);
    }

    if (!phoneNumber) {
      throw new AppError('phone number is required', 400);
    }

    if (!email) {
      throw new AppError('email is required', 400);
    }

    if (!address) {
      throw new AppError('address is required', 400);
    }

    if (!password) {
      throw new AppError('password is required', 400);
    }

    if (!confirmPassword) {
      throw new AppError('confirm password please', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }
    const strEmail = email + '';
    const strPhoneNumber = phoneNumber + '';
    //validate

    if (!phoneNumber && !email) {
      throw new AppError('phone number and email is required', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      address,
      phoneNumber: strPhoneNumber,
      email: strEmail,
      role,
      password: hashedPassword
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNumberOrEmail, password } = req.body;
    // console.log(
    //   phoneNumberOrEmail,
    //   password + '*********************************'
    // );
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { phoneNumber: phoneNumberOrEmail },
          { email: phoneNumberOrEmail }
        ]
      }
    });
    // console.log(user);

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError('email address or mobile phone is invalid', 400);
    }

    const token = genToken({
      id: user.id,
      role: user.role
    });
    // console.log(token);
    // res.status(200).json({ token: token, role: user.role }); don't save
    res.status(200).json({ token }); // res token to font-end and decode ********
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
