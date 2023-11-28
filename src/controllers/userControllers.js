const database = require("../../database");

const users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Cookie",
    email: "john@gmail.com",
    city: "Paris",
    language: "French",
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Cookie",
    email: "bob@gmail.com",
    city: "Paris",
    language: "French",
  },
  {
    id: 3,
    firstname: "Shannon",
    lastname: "Aa",
    email: "shannon@gmail.com",
    city: "Zurich",
    language: "German",
  },
];

const getUser = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  database
    .query(`select * from users where id = ${req.params.id}`)
    .then(([users]) => {
      if (users.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(users[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      `insert into users (firstname, lastname, email, city, language) values (?, ?, ?, ?, ?)`,
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({
        id: result.insertId,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const putUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      `update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?`,
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`delete from users where id = ?`, [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
