'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User)
    Comment.belongsToMany(Comment, {
      through: {
        model: 'EntityComment',
        scope: { entity: 'Comment' },
      },
      foreignKey: 'EntityId',
      constraints: false,
      otherKey: 'CommentId',
      as: 'Replies',
    })
  };
  return Comment;
};