module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        unique: {
          args: "email",
          msg: "The email is already taken!",
        },
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
        unique: {
          args: "username",
          msg: "The username is already taken!",
        },
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      tableName: "Users",
      indexes: [
        {
          name: "unique_index",
          unique: true,
          fields: ["username", "email"],
        },
      ],
    }
  );
  return User;
};
