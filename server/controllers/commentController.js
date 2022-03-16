const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");

class CommentController {
  //GET ALL BY BOOK ID
  async getAllByBookId(req, res, next) {
    console.log("getAllByBookId", req.params);
    try {
      const { bookId } = req.params;

      if (!bookId) {
        return res.json({
          status: false,
          message: "no book id",
        });
      }
      let comments = await db.Comment.findAll({
        where: {
          bookId,
        },
        include: ["user", "parrent"],
      });

      comments = comments.map((item) => {
        item.user.password = null;
        return item;
      });
      return res.json({
        status: true,
        message: `all comments by book id:${bookId} get successfully`,
        bookId,
        comments,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // ADD BOOK COMMENT
  async addBookComment(req, res, next) {
    console.log("addBookComment", req.body);
    //try {
    const { bookId, userId, text, parrentId } = req.body;

    if (!bookId) {
      return res.json({
        status: false,
        message: "no book id",
      });
    }

    if (!text) {
      return res.json({
        status: false,
        message: "no text",
      });
    }
    const comment = await db.Comment.create({
      bookId,
      userId: userId === "" ? null : userId, // тот кто создал
      text,
      parrentId: parrentId === "" ? 0 : parrentId, // ид комаентаря
    });

    const parrentComment = await db.Comment.findByPk(
      parrentId ? parrentId : 0,
      {
        include: ["user"],
      }
    );

    console.log("parrentComment.user.id", parrentComment?.user?.id);

    const not = {
      bookId: Number(bookId),
      userId: 1, //тот кому приходят уведомления
      replyUser: 1, //тот кто ответил
      read: false,
      commentId: comment.id,
    };
    console.log("not", not);

    const notification = await db.Notification.create(not);

    // if (parrentComment?.user?.id) {
    //   const notification = await db.Notification.create({
    //     bookId,
    //     userId: parrentComment.user.id,
    //     replyUser: userId === "" ? null : userId,
    //     read: false,
    //     commentId: comment.id,
    //   });
    // }

    // console.log("notification", notification);
    //console.log(comment);

    return res.json({
      status: true,
      message: "comment create successfully",
      comment,
    });
    //} catch (e) {
    //next(ApiError.badRequest(e.message));
    //}
  }

  // REMOVE BOOK COMMENT
  async removeBookComment(req, res, next) {
    console.log("removeBookComment", req.body);
    try {
      const { id, userId } = req.body;

      if (!id) {
        return res.json({
          status: false,
          message: "no comment id",
        });
      }

      const result = await db.Comment.destroy({
        where: { id },
      });
      if (result) {
        return res.json({
          status: true,
          message: `comment with id:${id} deleted successfully`,
        });
      } else {
        return res.json({
          status: true,
          message: `there is no comment with id:${id} to delete`,
        });
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CommentController();
