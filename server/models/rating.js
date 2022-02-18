"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rating.belongsTo(models.User);
      Rating.belongsTo(models.Book);
    }
  }
  Rating.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
      },
      rate: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
