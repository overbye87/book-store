"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Genres",
      [
        {
          name: "Classic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Adventures",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Novel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Poems",
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
