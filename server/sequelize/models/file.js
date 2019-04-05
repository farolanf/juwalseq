'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    url: { type: DataTypes.STRING(150), allowNull: false },
  }, {
    timestamps: false,
  });
  File.associate = function(models) {
    File.belongsTo(models.User)
  };
  return File;
};