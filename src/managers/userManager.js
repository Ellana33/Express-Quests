const AbstractManager = require("./abstractManager");

class UserManager extends AbstractManager {
  async getOne(id) {
    try {
      const [users] = await this.database.query(
        `select * from users where id = ${id}`
      );
      return users.length === 0 ? null : users[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserManager;
