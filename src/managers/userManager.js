const AbstractManager = require("./abstractManager");

class UserManager extends AbstractManager {
  async getOne(id) {
    const [users] = await this.database.query(
      `select * from users where id = ${id}`
    );
    return users.length === 0 ? null : users[0];
  }
  async create(body) {
    const { firstname, lastname, email, city, language, password } = body;
    const [result] = await this.database.query(
      `insert into users (firstname, lastname, email, city, language, PASSWORD) values (?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, city, language, password]
    );
    return {
      id: result.insertId,
    };
  }
  async getOneByEmail(email) {
    const [result] = await this.database.query(
      `SELECT * FROM users WHERE email LIKE ?`,
      [email]
    );
    return result;
  }
}

module.exports = UserManager;
