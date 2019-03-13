'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductAttribute',
    timestamps: false,
  });
  return ProductAttribute;
};