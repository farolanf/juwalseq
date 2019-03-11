'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductReaction = sequelize.define('ProductReaction', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
  }, {
    tableName: 'ProductReaction',
    indexes: [
      { fields: ['ReactionId'], unique: true },
    ],
    timestamps: false,
  });
  return ProductReaction;
};