'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define('CommentReaction', {
    ReactionId: { type: DataTypes.INTEGER, unique: true }
  }, {
    tableName: 'CommentReaction',
  });
  return CommentReaction;
};