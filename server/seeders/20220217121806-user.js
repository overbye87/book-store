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
          name: "Timon",
          email: "timon@timon.ru",
          password: bcrypt.hashSync("timon", saltRounds),
          role: "USER",
          img: "timon.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sparkle",
          email: "sparkle@sparkle.ru",
          password: bcrypt.hashSync("sparkle", saltRounds),
          role: "USER",
          img: "sparkle.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Frog",
          email: "frog@frog.ru",
          password: bcrypt.hashSync("frog", saltRounds),
          role: "USER",
          img: "frog.jpg",
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
