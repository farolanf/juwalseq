'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User)
    // Actually a comment only belongs to one product. It use belongsToMany
    // so a through table used, and will be enforced there with unique constraint.
    Comment.belongsToMany(models.Product, { through: 'ProductComment' })
    Comment.belongsToMany(models.Reaction, { through: 'CommentReaction' })
  };
  return Comment;
};