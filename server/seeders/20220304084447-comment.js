"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          answerId: null,
          text: "Blah blah blah book is good...",
          userId: 1,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answerId: null,
          text: "Second comment another author...",
          userId: 2,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          answerId: null,
          text: "Another comment another author...",
          userId: 2,
          bookId: 2,
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
