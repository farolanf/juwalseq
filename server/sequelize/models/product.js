'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(4000), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discountedPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: DataTypes.STRING,
    image2: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    display: DataTypes.TINYINT,
  }, {
    timestamps: false,
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User)
    Product.belongsToMany(models.Category, { through: 'ProductCategory' })
    Product.belongsToMany(models.AttributeValue, { through: 'ProductAttribute' })
    Product.belongsToMany(models.Reaction, { through: 'ProductReaction' })
    Product.belongsToMany(models.Comment, { through: 'ProductComment' })
  };
  return Product;
};