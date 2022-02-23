const db = require("../models");

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");

class BookController {
  async create(req, res, next) {
    try {
      const { name, price, authorId, genreId, info } = req.body;
      const { img } = req.files;
      let fileName = "img_" + uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const book = await db.Book.create({
        name,
        price,
        authorId,
        genreId,
        img: fileName,
      });
      return res.json(book);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const books = await db.Book.findAll({ include: "author" });
      return res.json(books);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getOne(req, res) {}
}

module.exports = new BookController();
