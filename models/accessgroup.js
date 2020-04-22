'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessGroup = sequelize.define('AccessGroup', {
    value: {
      type: Sequelize.STRING
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
  }, {});
  AccessGroup.associate = function (models) {
    // associations can be defined here
  };
  return AccessGroup;
};