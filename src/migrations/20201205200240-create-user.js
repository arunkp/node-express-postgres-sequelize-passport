"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Users", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstname: {
          type: Sequelize.STRING,
        },
        lastname: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        username: {
          primaryKey: true,
          type: Sequelize.TEXT,
          unique: true,
          allowNull: false,
          references: {
            model: "Users",
            key: "username",
          },
          onUpdate: "cascade",
          onDelete: "cascade",
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addIndex("Users", ["email", "username"], {
          unique: true,
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
