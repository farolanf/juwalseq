'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    storage: { type: DataTypes.STRING(20), allowNull: false },
    name: { type: DataTypes.STRING(20), allowNull: false },
    url: { type: DataTypes.STRING(150), allowNull: false },
  }, {
    timestamps: false,
  });
  return File;
};