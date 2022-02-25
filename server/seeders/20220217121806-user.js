"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          email: "admin@admin.ru",
          password: bcrypt.hashSync("admin", saltRounds),
          role: "ADMIN",
          img: "user.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane",
          email: "user@user.ru",
          password: bcrypt.hashSync("user", saltRounds),
          role: "USER",
          img: "user.jpg",
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
