'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTypeAttribute = sequelize.define('ProductTypeAttribute', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductTypeAttribute',
    timestamps: false,
  });
  return ProductTypeAttribute;
};