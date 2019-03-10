'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false }
  }, {
    timestamps: false,
  });
  Department.associate = function(models) {
    Department.hasMany(models.Category)
  }
  return Department;
};