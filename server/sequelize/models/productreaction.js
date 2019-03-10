'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReaction = sequelize.define('ProductReaction', {
    ReactionId: { type: DataTypes.INTEGER, unique: true }
  }, {
    tableName: 'ProductReaction',
  });
  return ProductReaction;
};