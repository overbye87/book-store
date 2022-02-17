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
      this.belongsTo(models.Basket);
      this.belongsTo(models.Book);
    }
  }
  BasketBook.init(
    {},
    {
      sequelize,
      modelName: "BasketBook",
    }
  );
  return BasketBook;
};
