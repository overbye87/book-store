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
      Book.belongsTo(models.Author, { as: "author", foreignKey: "authorId" });
      Book.belongsTo(models.Genre, { as: "genre", foreignKey: "genreId" });
      Book.hasMany(models.Rating);
      Book.hasMany(models.BasketBook);
      Book.hasMany(models.BookInfo);
    }
  }
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      img: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
