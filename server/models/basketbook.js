"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BasketBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BasketBook.belongsTo(models.Basket);
      BasketBook.belongsTo(models.Book);
    }
  }
  BasketBook.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: "BasketBook",
    }
  );
  return BasketBook;
};
