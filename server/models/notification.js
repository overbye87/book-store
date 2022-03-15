"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User, {
        as: "user",
        foreignKey: "replyUser",
      });
      Notification.belongsTo(models.Book, { as: "book", foreignKey: "bookId" });
      Notification.belongsTo(models.Comment, {
        as: "comment",
        foreignKey: "commentId",
      });
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
      },
      text: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true },
      read: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
