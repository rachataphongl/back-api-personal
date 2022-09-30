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

  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false
      }
    });

    OrderItem.belongsTo(db.Menu, {
      foreignKey: {
        name: 'menuId',
        allowNull: false
      }
    });
  };

  return OrderItem;
};
