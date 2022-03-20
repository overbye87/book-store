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
        include: ["user", "parent"],
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
  // === === === === === === === === === ===
  async addBookComment(req, res, next, io) {
    console.log("addBookComment", req.body);
    try {
      const { bookId, userId, text, parentId } = req.body;

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
        userId: userId === "" || userId === null ? null : userId, // id user who created comment
        text,
        parentId: parentId === "" || parentId === null ? 0 : parentId, // parent comment id - becomes 0 if root comment
      });

      if (parentId) {
        var parentComment = await db.Comment.findByPk(parentId, {
          include: ["user"],
        });
        //console.log(parentId, parentComment);
        const notification = await db.Notification.create({
          bookId: Number(bookId),
          read: false,

          parentUserId: parentComment?.user?.id ? parentComment.user.id : null,
          parentCommentId: parentId,

          replyUserId: userId,
          replyCommentId: comment.id,
        });
      }

      const notifications = await db.Notification.findAll({
        where: {
          parentUserId: parentComment?.user?.id ? parentComment.user.id : null,
          read: false,
        },
        include: ["parentUser", "replyUser"],
      });

      //console.log(parentComment?.user?.id);
      io.in(`${parentComment?.user?.id}`).emit("notifications", notifications);

      return res.json({
        status: true,
        message: "comment create successfully",
        comment,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  // === === === === === === === === === ===

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
