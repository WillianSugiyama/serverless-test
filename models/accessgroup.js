module.exports = (sequelize, DataTypes) => {
  const AccessGroup = sequelize.define(
    "AccessGroup", {
      value: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
    }, {}
  );
  AccessGroup.associate = function (models) {
    // associations can be defined here
  };
  return AccessGroup;
};