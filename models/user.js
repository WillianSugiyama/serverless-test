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
    },
    User.hook('beforeCreate', async (instance, options) => {
      return await hashPass(instance.dataValues.password);
    }),
    User.hook('beforeUpdate', async (instance, options) => {
      return await hashPass(instance.dataValues.password);
    }),
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};