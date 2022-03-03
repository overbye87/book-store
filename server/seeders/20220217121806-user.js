"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Pepe",
          email: "admin@admin.ru",
          password: bcrypt.hashSync("admin", saltRounds),
          role: "ADMIN",
          img: "pepe.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Biba",
          email: "user@user.ru",
          password: bcrypt.hashSync("user", saltRounds),
          role: "USER",
          img: null,
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
