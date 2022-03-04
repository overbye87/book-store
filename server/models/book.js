"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Book.belongsTo(models.Author, { as: "author", foreignKey: "authorId" });
      //Book.belongsTo(models.Author);
      //Book.belongsTo(models.Genre, { as: "genre", foreignKey: "genreId" });
      //Book.belongsTo(models.Genre);

      Book.belongsTo(models.Author, { as: "author", foreignKey: "authorId" });
      Book.belongsTo(models.Genre, { as: "genre", foreignKey: "genreId" });

      Book.hasMany(models.Rating, { as: "rating", foreignKey: "bookId" });
      Book.hasMany(models.BasketBook);
      Book.hasMany(models.BookInfo);
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      //rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      description: { type: DataTypes.STRING, allowNull: false },
      img: { type: DataTypes.STRING, allowNull: false },
      // authorId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
      // genreId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
