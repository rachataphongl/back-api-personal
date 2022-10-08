const { User } = require('../../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const genToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'key', {
    expiresIn: process.env.JWT_EXPIRES || '3d'
  });
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNumberOrEmail, password } = req.body;
    const admin = await User.findOne({
      where: {
        [Op.or]: [
          { phoneNumber: phoneNumberOrEmail },
          { email: phoneNumberOrEmail }
        ]
      }
    });
    // console.log(admin);
    if (admin.role !== 'admin') {
      throw new AppError('T_T', 400);
    }

    // const isCorrect = await bcrypt.compare(password, admin.password);
    // if (!isCorrect) {
    //   throw new AppError(':(', 400);
    // }

    const thisAdmin = genToken({ role: admin.role });
    res.status(200).json({ thisAdmin });
  } catch (err) {
    next(err);
  }
};
