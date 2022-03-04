const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

router.post("/", bookController.create);
router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);

router.post("/rating", authMiddleware, bookController.updateRateBook);
module.exports = router;
