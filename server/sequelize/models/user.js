'use strict';
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set (val) {
        this.setDataValue('password', User.generatePassword(val))
      }
    },
    facebookId: { type: DataTypes.STRING(100), unique: true },
    googleId: { type: DataTypes.STRING(100), unique: true },
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