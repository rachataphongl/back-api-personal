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

  return Menu;
};
