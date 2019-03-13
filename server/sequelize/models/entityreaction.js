'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntityReaction = sequelize.define('EntityReaction', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    entity: { type: DataTypes.STRING(50), allowNull: false },
  }, {
    tableName: 'EntityReaction',
    timestamps: false,
  });
  return EntityReaction;
};