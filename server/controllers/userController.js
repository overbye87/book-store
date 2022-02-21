const db = require("../models");

const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const { secret } = require("../secret");

const generateAccessToken = (user) => {
  const payload = {
    user,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class UserController {
  // --- REGISTRATION --- --- ---

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      // check input validation
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: false, message: "Validation failed", ...errors });
      }
      const { email, password, name, role, img } = req.body;
      // check existing email
      const candidate = await db.User.findOne({ where: { email: email } });
      if (candidate) {
        return res.status(400).json({
          status: false,
          message: "Email alredy exist",
        });
      }
      // calculate hash and creation user
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await db.User.create({
        name,
        email,
        password: hash,
        img,
        role,
      });
      const responseUser = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      // deleting user password, before putting it into token
      delete responseUser.password;
      // generate token and put user in
      const token = generateAccessToken(responseUser);
      return res.json({
        status: true,
        token,
        //user: responseUser,  //not needed - user is in the token
        message: `User with ${email} successfully registered`,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: false, message: "Registration error" });
    }
  }

  // --- LOGIN --- --- ---

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: `User with ${email} not found` });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ status: false, message: `Password is incorrect` });
      }
      // deleting user password, before putting it into token
      delete user.password;
      // generate token
      const token = generateAccessToken(user);

      return res.json({
        status: true,
        token,
        //user: user,   //not needed - user is in the token
        message: `Login successful`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await db.User.findAll({
        raw: true,
      });
      const responseUsers = users.map((user) => {
        delete user.password;
        return user;
      });

      return res.json({
        status: true,
        users: responseUsers,
        message: `Users retrieved successfully`,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: `Can not get users` });
    }
  }
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("No ID"));
    }

    res.json(id);
  }
}

module.exports = new UserController();
