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
      //Genre.hasMany(models.Book, { as: "bookId", foreignKey: "genreId" });
      Genre.hasMany(models.Book, { foreignKey: "genreId" });
      Genre.belongsToMany(models.Author, { through: models.AuthorGenre });
    }
  }
  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
