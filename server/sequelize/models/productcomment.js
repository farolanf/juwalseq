'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductComment = sequelize.define('ProductComment', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductComment',
    indexes: [
      { fields: ['CommentId'], unique: true },
    ],
    timestamps: false,
  });
  return ProductComment;
};