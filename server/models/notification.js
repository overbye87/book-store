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
        as: "parentUser",
        foreignKey: "parentUserId",
      });
      Notification.belongsTo(models.User, {
        as: "replyUser",
        foreignKey: "replyUserId",
      });
      Notification.belongsTo(models.Book, { as: "book", foreignKey: "bookId" });

      Notification.belongsTo(models.Comment, {
        as: "parentComment",
        foreignKey: "parentCommentId",
      });
      Notification.belongsTo(models.Comment, {
        as: "replyComment",
        foreignKey: "replyCommentId",
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
      read: { type: DataTypes.BOOLEAN, allowNull: false },

      parentUserId: { type: DataTypes.INTEGER, allowNull: false },
      replyUserId: { type: DataTypes.INTEGER, allowNull: false },
      parentCommentId: { type: DataTypes.INTEGER, allowNull: false },
      replyCommentId: { type: DataTypes.INTEGER, allowNull: false },
      bookId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
