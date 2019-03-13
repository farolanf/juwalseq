'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000) },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  }, {
    timestamps: false,
  });
  Category.associate = function(models) {
    Category.belongsTo(models.Department)
    Category.belongsToMany(models.Product, { through: 'ProductCategory' })
    Category.belongsToMany(models.ProductType, { through: 'ProductTypeCategory' })
  };
  return Category;
};