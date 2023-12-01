const database = require("../../database");

const loginMiddlewares = async (req, res, next) => {
  const [user] = await database.query(
    `SELECT * FROM users WHERE email LIKE ? AND PASSWORD LIKE ?`,
    [req.body.email, req.body.password]
  );

  if (user.length) {
    next();
  } else {
    res.status(401).send({ error: "Mauvais identifiant" });
  }
};

module.exports = loginMiddlewares;
