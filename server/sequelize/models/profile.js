'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    propinsi: { type: DataTypes.STRING(50) },
    kabupaten: { type: DataTypes.STRING(50) },
    phone: { type: DataTypes.STRING(20) },
    cartId: { type: DataTypes.STRING(32), allowNull: false, unique: true }
  }, {
    indexes: [
      { fields: ['userId'], unique: true },
    ],
  });
  Profile.associate = function(models) {
    Profile.belongsTo(models.User)
  }
  return Profile;
};