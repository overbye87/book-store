"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Notifications",
      [
        {
          bookId: 1,
          read: false,
          parentCommentId: 1,
          parentUserId: 1,
          replyCommentId: 5,
          replyUserId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bookId: 1,
          read: false,
          parentCommentId: 1,
          parentUserId: 1,
          replyCommentId: 7,
          replyUserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bookId: 1,
          read: false,
          parentCommentId: 1,
          parentUserId: 1,
          replyCommentId: 8,
          replyUserId: 2,
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
