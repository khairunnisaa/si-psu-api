'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.users, {foreignKey: 'roleId', through: 'user_roles', otherKey: 'userId'});
  };

  return Role;
};
