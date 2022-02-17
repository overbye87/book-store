const db = require("../models");
class AuthorController {
  async create(req, res) {
    const { name } = req.body;
    const author = await db.Author.create({ name });
    return res.json(author);
  }
  async getAll(req, res) {
    const authors = await db.Author.findAll();
    return res.json(authors);
  }
}

module.exports = new AuthorController();
