"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Authors",
      [
        {
          name: "Bulgakov",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tolstoy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pushkin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dostoevskiy",
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
