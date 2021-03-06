const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");

class BookController {
  async create(req, res, next) {
    //try {
    const { name, price, authorId, genreId, info } = req.body;
    console.log(req.body);
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
    // } catch (e) {
    //   next(ApiError.badRequest(e.message));
    // }
  }

  async getAll(req, res, next) {
    try {
      // api/book?author=2&genre=1&page=1
      let { limit, page, minp, maxp } = req.query;
      if (page <= 0) {
        page = 1;
      }
      page = page || 1;
      limit = limit || 6;
      let offset = page * limit - limit;
      console.log("Book list filter query:", req.query);
      const where = {};

      if (minp && maxp) {
        //console.log(maxp);
        where.price = { [Op.between]: [Number(minp), Number(maxp)] };
      }

      if (req.query.author) {
        let author = String(req.query.author).split(",");
        where.authorId = author;
      }
      if (req.query.genre) {
        let genre = String(req.query.genre).split(",");
        where.genreId = genre;
      }
      const books = await db.Book.findAndCountAll({
        include: ["genre", "author", "rating"],
        where,
        limit,
        offset,
        distinct: true,
      });

      books.page = page;
      books.limit = limit;
      return res.json(books);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // *** GET ONE BOOK ***
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!Number(id)) {
        return res.status(400).json({
          status: false,
          message: "id is incorrect",
        });
      }
      const book = await db.Book.findByPk(id, {
        include: [
          "genre",
          "author",
          "rating",
          { model: db.Comment, as: "comment", include: ["user"] },
        ],
      });
      if (!book) {
        return res.status(400).json({
          status: false,
          message: `there is no book with id:${id}`,
        });
      }
      return res.json(book);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BookController();
