module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    'Menu',
    {
      name: {
        type: DataTypes.STRING,
        allowNUll: false
      },
      description: {
        type: DataTypes.STRING,
        allowNUll: false
      },
      imagePath: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { underscored: true }
  );

  Menu.associate = (db) => {
    Menu.hasMany(db.OrderItem, {
      foreignKey: {
        name: 'menuId',
        allowNull: false
      }
    });

    Menu.hasMany(db.Cart, {
      foreignKey: {
        name: 'menuId',
        allowNull: false
      }
    });

    // Menu.belongsTo(db.IngredientList, {
    //   foreignKey: {
    //     name: 'ingredientListId',
    //     allowNull: false
    //   }
    // });
  };

  return Menu;
};
