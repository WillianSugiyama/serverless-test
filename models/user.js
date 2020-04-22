'use strict';
const hashPass = require('../src/utils/hashPassword');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accessGroupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "accessGroups",
        key: "id"
      },
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        return await hashPass(user.password);
      },
      beforeUpdate: async (user, options) => {
        return await hashPass(user.password);
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};