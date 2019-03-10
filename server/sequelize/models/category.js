'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false }
  }, {
    timestamps: false,
  });
  Category.associate = function(models) {
    Category.belongsTo(models.Department)
    Category.belongsToMany(models.Product, { through: 'ProductCategory' })
  };
  return Category;
};