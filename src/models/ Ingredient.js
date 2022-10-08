module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    'Ingredient',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { underscored: true }
  );

  Ingredient.associate = (db) => {
    Ingredient.hasMany(db.IngredientList, {
      foreignKey: {
        name: 'ingredientId',
        allowNull: false
      }
    });
  };

  return Ingredient;
};
