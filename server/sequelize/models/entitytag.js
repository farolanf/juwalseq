'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntityTag = sequelize.define('EntityTag', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    entity: { type: DataTypes.STRING(50), allowNull: false },
  }, {
    tableName: 'EntityTag',
    timestamps: false,
  });
  return EntityTag;
};