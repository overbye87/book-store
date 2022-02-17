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
      this.belongsTo(models.Author);
      this.belongsTo(models.Genre);
      this.hasMany(models.Rating);
      this.hasMany(models.BasketBook);
      this.hasMany(models.BookInfo);
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
