const AbstractManager = require("./abstractManager");

class MovieManager extends AbstractManager {

  async getAll(req) {
    try {
      let sql = "select * from movies";
      const sqlValues = [];

      if (req.query.color != null) {
        sql += " where color = ?";
        sqlValues.push(req.query.color);
      }

      if (req.query.max_duration != null) {
        sql += " and duration <= ?";
        sqlValues.push(req.query.max_duration);
      } else if (req.query.max_duration != null) {
        sql += " where duration <= ?";
        sqlValues.push(req.query.max_duration);
      }

      const [movies] = await this.database.query(sql, sqlValues);
      return movies;
    } catch (err) {
      throw err;
    }
  }

  async getOne(id) {
    try {
      const [movies] = await this.database.query(
        `select * from movies where id = ${id}`
      );
      return movies.length === 0 ? null : movies[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MovieManager;
