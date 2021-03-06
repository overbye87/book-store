"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          parentId: 0,
          text: "Blah blah blah book is good...",
          userId: 1,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 0,
          text: "Second comment another author...",
          userId: 2,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 0,
          text: "Another comment another author...",
          userId: 3,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 0,
          text: "Another...",
          userId: 4,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 1,
          text: "Lorem lorem lorem...",
          userId: 4,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 4,
          text: "LooooooooooooooooL...",
          userId: 2,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 1,
          text: "USER 3 answer",
          userId: 3,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parentId: 1,
          text: "USER 2 answer",
          userId: 2,
          bookId: 1,
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
