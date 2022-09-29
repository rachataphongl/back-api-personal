module.exports = (sequelize, DataTypes) => {
  const IngredientMenu = sequelize.define('IngredientMenu', {
    ingredientItem: {
      type: DataTypes.INTEGER
    },
    amount: {
      type: DataTypes.STRING
    }
  });
};
