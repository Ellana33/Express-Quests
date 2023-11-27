const database = require("../../database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

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

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`select * from movies where id = ${id}`)
    .then(([movies]) => {
      if (movies.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(movies[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

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

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      `insert into movies (title, director, year, color, duration) values (?, ?, ?, ?, ?)`,
      [title, director, year, color, duration]
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

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(`insert into users (firstname, lastname, email, city, language) values (?, ?, ?, ?, ?)`, [firstname, lastname, email, city, language])
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

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  postUser,
  getUser,
  getUserById,
};
