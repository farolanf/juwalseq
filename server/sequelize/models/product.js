'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(4000), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    nego: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }, {
    timestamps: false,
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Provinsi)
    Product.belongsTo(models.Kabupaten)
    Product.belongsTo(models.User)
    Product.belongsToMany(models.AttributeValue, { through: 'ProductAttribute' })
    Product.belongsToMany(models.Category, { through: 'ProductCategory' })
    Product.belongsToMany(models.Tag, { 
      through: {
        model: 'EntityTag',
        scope: { entity: 'Product' },
      },  
      foreignKey: 'EntityId',
      constraints: false,
    })
    Product.belongsToMany(models.Reaction, { 
      through: {
        model: 'EntityReaction',
        scope: { entity: 'Product' },
      },  
      foreignKey: 'EntityId',
      constraints: false,
    })
    Product.belongsToMany(models.Comment, { 
      through: {
        model: 'EntityComment',
        scope: { entity: 'Product' },
      },  
      foreignKey: 'EntityId',
      constraints: false,
    })
    Product.belongsToMany(models.File, { 
      through: {
        model: 'EntityFile',
        scope: { entity: 'Product', meta: 'image' },
      },
      foreignKey: 'EntityId',
      constraints: false,
      as: 'Images'
    })
  };
  return Product;
};