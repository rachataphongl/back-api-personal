module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    amount: {
      type: DataTypes.INTEGER
    }
  });

  return Cart;
};
