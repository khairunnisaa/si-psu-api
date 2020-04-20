'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    nik: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.roles, {foreignKey: 'userId', through: 'user_roles', otherKey: 'roleId'});
  };

  return User;
};
