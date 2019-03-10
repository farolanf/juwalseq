'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    reaction: { type: DataTypes.STRING(20), allowNull: false },
  }, {});
  Reaction.associate = function(models) {
    Reaction.belongsTo(models.User)
    Reaction.belongsToMany(models.Comment, { through: 'CommentReaction' })
    Reaction.belongsToMany(models.Product, { through: 'ProductReaction' })
  };
  return Reaction;
};