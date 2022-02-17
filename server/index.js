require("dotenv").config();
const express = require("express");
const sequelize = require("./models");

const PORT = process.env.PORT || 4000;

const app = express();

const start = async () => {
  try {
    //sequelize.authenticate();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
