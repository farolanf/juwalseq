'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kabupaten = sequelize.define('Kabupaten', {
    name: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    timestamps: false,
  });
  Kabupaten.associate = function (models) {
    Kabupaten.belongsTo(models.Provinsi)
  }
  return Kabupaten;
};