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
      Book.belongsTo(models.Author);
      Book.belongsTo(models.Genre);
      Book.hasMany(models.Rating);
      Book.hasMany(models.BasketBook);
      Book.hasMany(models.BookInfo);
    }
  }
  Book.init(
    {
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
