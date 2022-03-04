"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Ratings",
      [
        {
          rate: 9,
          bookId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 3,
          bookId: 1,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 8,
          bookId: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 5,
          bookId: 1,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 7,
          bookId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 1,
          bookId: 1,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 6,
          bookId: 4,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 4,
          bookId: 1,
          userId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
