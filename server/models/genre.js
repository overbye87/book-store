"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genre.hasMany(models.Book, { as: "bookId", foreignKey: "id" });
      Genre.belongsToMany(models.Author, { through: models.AuthorGenre });
    }
  }
  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Genre",
    }
  );
  return Genre;
};
