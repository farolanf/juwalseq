'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductComment = sequelize.define('ProductComment', {
    CommentId: { type: DataTypes.INTEGER, unique: true }
  }, {
    tableName: 'ProductComment',
  });
  return ProductComment;
};