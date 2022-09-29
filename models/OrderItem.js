module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      amount: {
        type: DataTypes.INTEGER
      },
      priceWhenOrder: {
        type: DataTypes.INTEGER
      }
    },
    { underscored: true }
  );

  return OrderItem;
};
