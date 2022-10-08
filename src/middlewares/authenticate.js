const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new AppError('unauthenticated1', 401);
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new AppError('unauthenticated2', 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'key');

    const user = await User.findOne({
      where: { id: payload.id },
      attributes: { exclude: 'password' }
    });
    console.log('****************', user);
    if (!user) {
      throw new AppError('unauthenticated3', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
