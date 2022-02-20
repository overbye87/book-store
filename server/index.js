require("dotenv").config();
const express = require("express");
const db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    //await db.sequelize.authenticate(); //test db connaction
    //await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
