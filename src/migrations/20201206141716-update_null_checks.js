"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Users", "firstname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "lastname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Users", "firstname", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "lastname", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
