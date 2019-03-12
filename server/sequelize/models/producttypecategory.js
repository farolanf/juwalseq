'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTypeCategory = sequelize.define('ProductTypeCategory', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductTypeCategory',
    timestamps: false,
  });
  return ProductTypeCategory;
};