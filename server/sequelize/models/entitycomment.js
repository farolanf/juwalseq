'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntityComment = sequelize.define('EntityComment', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    entity: { type: DataTypes.STRING(50), allowNull: false },
  }, {
    tableName: 'EntityComment',
    timestamps: false,
  });
  return EntityComment;
};