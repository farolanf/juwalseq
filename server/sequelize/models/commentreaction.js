'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define('CommentReaction', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'CommentReaction',
    indexes: [
      { fields: ['ReactionId'], unique: true },
    ],
    timestamps: false,
  });
  return CommentReaction;
};