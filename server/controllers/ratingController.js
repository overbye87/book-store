const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");

class RatingController {
  // *** UPDATE BOOK RATE ***
  async updateBookRate(req, res, next) {
    console.log("updateBookRate", req.body);
    try {
      const { bookId, userId, rate } = req.body;
      const candidate = await db.Rating.findOne({
        where: { bookId: bookId, userId: userId },
      });

      if (rate == "" || rate == "null") {
        if (candidate) {
          const rating = await db.Rating.destroy({
            where: { bookId: bookId, userId: userId },
          });
          return res.json({
            status: true,
            message: "rating record deleted successfully",
          });
        } else {
          return res.json({ status: true, message: "nothing to remove" });
        }
      } else {
        if (candidate) {
          const rating = await db.Rating.update(
            { rate },
            { where: { bookId: bookId, userId: userId } }
          );
          return res.json({
            status: true,
            message: "rating record update successfully",
          });
        } else {
          const rating = await db.Rating.create({
            rate,
            bookId,
            userId,
          });
          return res.json({
            status: true,
            message: "rating record create successfully",
          });
        }
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new RatingController();
