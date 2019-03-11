'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    reaction: { type: DataTypes.STRING(20), allowNull: false },
  }, {
    timestamps: false,
  });
  Reaction.associate = function(models) {
    Reaction.belongsTo(models.User)
  };
  return Reaction;
};