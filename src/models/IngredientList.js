module.exports = (sequelize, DataTypes) => {
  const IngredientList = sequelize.define(
    'IngredientList',
    {
      ingredientItem: {
        type: DataTypes.INTEGER
      },
      amount: {
        type: DataTypes.STRING
      }
    },
    { underscored: true }
  );

  IngredientList.associate = (db) => {
    // IngredientList.hasMany(db.Menu, {
    //   foreignKey: {
    //     name: 'ingredientListId',
    //     allowNull: false
    //   }
    // });
    IngredientList.belongsTo(db.Ingredient, {
      foreignKey: {
        name: 'ingredientId',
        allowNull: false
      }
    });
  };

  return IngredientList;
};
