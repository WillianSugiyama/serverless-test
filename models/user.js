const hashPassword = require("../src/utils/hashPassword");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "accessGroups",
          key: "id",
        },
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
    },
    {
      hooks: {
        beforeSave: (user, options) => {
          return hashPassword
            .default(user.password)
            .then((hashedPassword) => {
              user.password = hashedPassword;
            })
            .catch((error) => {
              console.log("error", error);
              throw new Error(error);
            });
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
