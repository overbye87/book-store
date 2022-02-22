const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);

// protected routes only with valid token
// authMiddleware !!! putting {user} from token into request
router.get("/auth", authMiddleware, userController.check); //this regenerate token
router.get("/all", authMiddleware, userController.getUsers);
router.put("/update", authMiddleware, userController.updateUser);
router.put("/updatepassword", authMiddleware, userController.updatePassword);

module.exports = router;
