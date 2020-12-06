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

    return await queryInterface.bulkInsert("Books", [
      {
        title: "Book of Krishna",
        price: "1349.99",
        description: "A book about a book of krishna",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Book of Rama",
        price: "493.99",
        description: "A book about a book of Rama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Book of Sneha",
        price: "492.99",
        description: "A book about a book of Sneha",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Book of Mom",
        price: "1002.99",
        description: "A book about a book of Mom",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Book of Dad",
        price: "41.99",
        description: "A book about a book of Dad",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    return await queryInterface.bulkDelete("Books", null, {});
  },
};
