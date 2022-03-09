"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      Comment.belongsTo(models.Book, { as: "book", foreignKey: "bookId" });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
      },
      answerId: { type: DataTypes.INTEGER, allowNull: true },
      text: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
