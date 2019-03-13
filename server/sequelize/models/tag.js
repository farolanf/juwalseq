'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: { type: DataTypes.STRING(20), allowNull: false },
  }, {
    timestamps: false,
  });
  return Tag;
};