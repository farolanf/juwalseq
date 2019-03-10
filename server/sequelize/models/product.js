'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(4000), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.Category, { through: 'ProductCategory' })
    Product.belongsToMany(models.AttributeValue, { through: 'ProductAttribute' })
    Product.belongsToMany(models.Reaction, { through: 'ProductReaction' })
    Product.belongsToMany(models.Comment, { through: 'ProductComment' })
  };
  return Product;
};