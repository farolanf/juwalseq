'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReaction = sequelize.define('ProductReaction', {
  }, {
    tableName: 'ProductReaction',
    indexes: [
      { fields: ['ReactionId'], unique: true },
    ],
  });
  return ProductReaction;
};