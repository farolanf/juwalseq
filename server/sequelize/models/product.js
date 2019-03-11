'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(4000), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  }, {
    timestamps: false,
  });
  Product.associate = function(models) {
    Product.belongsTo(models.User)
    Product.belongsToMany(models.AttributeValue, { through: 'ProductAttribute' })
    Product.belongsToMany(models.Category, { through: 'ProductCategory' })
    Product.belongsToMany(models.Reaction, { through: 'ProductReaction' })
    Product.belongsToMany(models.Comment, { through: 'ProductComment' })
    Product.belongsToMany(models.Tag, { 
      through: {
        model: 'EntityTag',
        scope: {
          entity: 'Product'
        },
      },  
      foreignKey: 'EntityId',
    })
    Product.belongsToMany(models.File, { 
      through: {
        model: 'EntityFile',
        scope: {
          entity: 'Product', 
          meta: 'image'
        },
      },
      foreignKey: 'EntityId',
      as: 'Images'
    })
  };
  return Product;
};