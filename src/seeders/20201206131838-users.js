"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const bcrypt = require("bcrypt");
    const password = "tehpassword$$$";
    return await queryInterface.bulkInsert("Users", [
      {
        firstname: "Arun",
        lastname: "Rao",
        email: "arunraokalya@gmail.com",
        username: "arunrao",
        password: bcrypt.hashSync("123456", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "admin",
      },
      {
        firstname: "Sneha",
        lastname: "Mysore",
        username: "snehams",
        password: bcrypt.hashSync("123456", 10),
        email: "isnehams@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
      },
      {
        firstname: "Venkat",
        lastname: "Sai Kiran",
        username: "vvsk",
        password: bcrypt.hashSync("123456", 10),
        email: "vvsk.1988@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "admin",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
