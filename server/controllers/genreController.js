const db = require("../models");
class GenreController {
  async create(req, res) {
    const { name } = req.body;
    const genre = await db.Genre.create({ name });
    return res.json(genre);
  }
  async getAll(req, res) {
    const genres = await db.Genre.findAll();
    return res.json(genres);
  }
}

module.exports = new GenreController();
