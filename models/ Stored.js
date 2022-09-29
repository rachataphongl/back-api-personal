module.exports = (sequelize, DataTypes) => {
  const Stored = sequelize.define(
    'Stored',
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

  return Stored;
};
