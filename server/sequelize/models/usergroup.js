'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    group: { type: DataTypes.STRING(20), allowNull: false }
  }, {});
  UserGroup.associate = function(models) {
    UserGroup.belongsTo(models.User)
  }
  return UserGroup;
};