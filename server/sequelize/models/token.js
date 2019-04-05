'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    UserId: DataTypes.INTEGER,
    name: { type: DataTypes.STRING(50), allowNull: false },
    token: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    indexes: [
      { fields: ['UserId', 'name'], unique: true },
    ]
  });
  Token.associate = function(models) {
    Token.belongsTo(models.User)
  };
  return Token;
};