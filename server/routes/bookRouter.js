const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");
const ratingController = require("../controllers/ratingController");
const commentController = require("../controllers/commentController");

//book
router.post("/", bookController.create);
router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);

//rating book
router.post("/rating", authMiddleware, ratingController.updateBookRate);

//comment book
router.get("/comment/:bookId", commentController.getAllByBookId);
router.post("/comment", authMiddleware, commentController.addBookComment);
router.delete("/comment", authMiddleware, commentController.removeBookComment);

module.exports = router;
