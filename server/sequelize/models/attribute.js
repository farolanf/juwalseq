'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    timestamps: false,
  });
  return Attribute;
};