'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    value: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    timestamps: false,
  });
  AttributeValue.associate = function(models) {
    AttributeValue.belongsTo(models.Attribute)
    AttributeValue.belongsToMany(models.Product, { through: 'ProductAttribute' })
  };
  return AttributeValue;
};