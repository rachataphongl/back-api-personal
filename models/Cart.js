module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      amount: {
        type: DataTypes.INTEGER
      }
    },
    { underscored: true }
  );

  return Cart;
};
