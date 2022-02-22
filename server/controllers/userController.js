const db = require("../models");

const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

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
  // --- CHECK REFRESH ACCESSTOKEN --- --- ---
  async check(req, res, next) {
    //console.log("Refresh token for user", req.user);
    const token = generateAccessToken(req.user);
    return res.json({
      status: true,
      token,
      //user: user,   //not needed - user is in the token
      message: `Token successfully refreshed`,
    });
  }

  // --- UPDATE USER INFORMATION --- --- ---
  async updateUser(req, res) {
    try {
      //getting user.id from middleware injection
      const { id } = req.user;
      //console.log("User from token", req.user);

      //getting new user data from request body
      const { email, name, img } = req.body;

      const candidate = await db.User.findOne({ where: { email: email } });

      //check existing email
      if (candidate) {
        return res.status(400).json({
          status: false,
          message: "Email alredy exist",
        });
      }

      if (typeof id !== "number") {
        return res
          .status(400)
          .json({ status: false, message: `Incorrect user id` });
      }

      const user = await db.User.findByPk(id, { raw: true });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: `Can not get user with id:${id}` });
      }
      // ok - update ) may be
      const status = await db.User.update(
        {
          name,
          email,
          img,
        },
        { where: { id: id } }
      );
      // get this updated user for response and new token generation
      const updatedUser = await db.User.findByPk(id, { raw: true });
      delete updatedUser.password;
      // generate new token from updated user
      const token = generateAccessToken(updatedUser);
      return res.json({
        status: true,
        user: updatedUser,
        token,
        message: `Data of user with id:${id} successfully updated. Token successfully refreshed`,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Can not change data of user with id:${id}`,
      });
    }
  }

  // --- UPDATE USER PASSWORD --- --- ---
  async updatePassword(req, res) {
    try {
      //getting user.id from middleware injection
      const { id } = req.user;
      //console.log("User from token", req.user);
      //getting new user data from request body
      const { oldPassword, newPassword } = req.body;
      if (typeof id !== "number") {
        return res.status(400).json({ status: false, message: `Incorrect id` });
      }
      // get user from db
      const user = await db.User.findByPk(id, { raw: true });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: `Can not get user with id:${id}` });
      }
      // check old password
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ status: false, message: `Password is incorrect` });
      }
      // calculate hash for new password
      const hash = await bcrypt.hash(newPassword, saltRounds);

      // ok - update password ) may be
      const status = await db.User.update(
        {
          password: hash,
        },
        { where: { id: id } }
      );
      const updatedUser = await db.User.findByPk(id, { raw: true });
      delete updatedUser.password;
      // generate new token from updated user
      const token = generateAccessToken(updatedUser);
      return res.json({
        status: true,
        user: updatedUser,
        token,
        message: `Password for user with id:${id} successfully updated. Token successfully refreshed`,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Can not change data of user with id:${id}`,
      });
    }
  }
}

module.exports = new UserController();
