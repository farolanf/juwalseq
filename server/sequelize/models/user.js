'use strict';
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false },
    username: { type: DataTypes.STRING(50), allowNull: false },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set (val) {
        this.setDataValue('password', User.generatePassword(val))
      }
    },
    facebookId: DataTypes.STRING(100),
    googleId: DataTypes.STRING(100),
  }, {
  });
  User.associate = function (models) {
    User.hasOne(models.Profile)
    User.hasMany(models.UserGroup)
    User.hasMany(models.Reaction)
    User.hasMany(models.Comment)
  };
  User.generatePassword = function (plain) {
    return bcrypt.hashSync(plain, saltRounds)
  }
  User.prototype.verifyPassword = function (plain) {
    return bcrypt.compareSync(plain, this.password)
  }
  return User;
};