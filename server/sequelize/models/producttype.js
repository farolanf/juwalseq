'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('ProductType', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(4000) },
  }, {
    timestamps: false,
  });
  ProductType.associate = function(models) {
    ProductType.belongsToMany(models.Attribute, { through: 'ProductTypeAttribute' })
    ProductType.belongsToMany(models.Category, { through: 'ProductTypeCategory' })
  };
  return ProductType;
};