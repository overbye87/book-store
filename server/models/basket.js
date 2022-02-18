"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Basket.hasMany(models.BasketBook);
      Basket.belongsTo(models.User);
    }
  }
  Basket.init(
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
      modelName: "Basket",
    }
  );
  return Basket;
};
