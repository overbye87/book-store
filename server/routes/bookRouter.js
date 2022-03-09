const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

router.post("/", bookController.create);
router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);

router.post("/rating", authMiddleware, bookController.updateBookRate);
router.post("/comment", authMiddleware, bookController.addBookComment);
router.delete("/comment", authMiddleware, bookController.removeBookComment);

module.exports = router;
