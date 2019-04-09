'use strict';
module.exports = (sequelize, DataTypes) => {
  const Provinsi = sequelize.define('Provinsi', {
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    timestamps: false,
  });
  Provinsi.associate = function (models) {
    Provinsi.hasMany(models.Kabupaten)
  }
  return Provinsi;
};