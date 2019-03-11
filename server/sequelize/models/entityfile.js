'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntityFile = sequelize.define('EntityFile', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    entity: { type: DataTypes.STRING(50), allowNull: false },
    meta: { type: DataTypes.STRING(50), allowNull: false },
  }, {
    tableName: 'EntityFile',
    timestamps: false,
  });
  return EntityFile;
};