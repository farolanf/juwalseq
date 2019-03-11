'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductCategory',
    timestamps: false,
  });
  return ProductCategory;
};