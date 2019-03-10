'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductComment = sequelize.define('ProductComment', {
  }, {
    tableName: 'ProductComment',
    indexes: [
      { fields: ['CommentId'], unique: true },
    ],
  });
  return ProductComment;
};