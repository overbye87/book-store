"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Notifications",
      [
        {
          text: "notification text 5",
          url: "http://localhost:3000/book/",
          read: false,
          commentId: 5,
          userId: 1,
          replyUser: 4,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "notification text 7",
          url: "http://localhost:3000/book/",
          read: false,
          commentId: 7,
          userId: 1,
          replyUser: 3,
          bookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "notification text 8",
          url: "http://localhost:3000/book/",
          read: false,
          commentId: 8,
          userId: 1,
          replyUser: 2,
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
