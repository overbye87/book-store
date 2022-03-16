"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      parentCommentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parentUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      replyCommentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      replyUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
