module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      payMentStatus: {
        type: DataTypes.ENUM('pending', 'success', 'fail'),
        defaultValue: 'pending'
      },
      slipUrl: {
        type: DataTypes.STRING
      },
      orderStatus: {
        type: DataTypes.ENUM('cart', 'processing', 'delivered')
      },
      totalPrice: {
        type: DataTypes.INTEGER
      }
    },
    { underscored: true }
  );

  return Order;
};
