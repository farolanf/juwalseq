'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentReaction = sequelize.define('CommentReaction', {
  }, {
    tableName: 'CommentReaction',
    indexes: [
      { fields: ['ReactionId'], unique: true },
    ],
  });
  return CommentReaction;
};