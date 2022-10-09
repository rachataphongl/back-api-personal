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

  Cart.associate = (db) => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    Cart.belongsTo(db.Menu, {
      foreignKey: {
        name: 'menuId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return Cart;
};
