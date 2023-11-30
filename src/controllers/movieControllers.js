const database = require("../../database");
const MovieManager = require("../managers/movieManager");
const UserManager = require("../managers/userManager")

const getMovies = async (req, res) => {
  const movieManager = new MovieManager();

  try {
    const movies = await movieManager.getAll(req);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getFirst = async (req, res) => {
  const movieManager = new MovieManager();
  const userManager = new UserManager();

  try {
    const movies = await movieManager.getOne(req.params.id);
    const users = await userManager.getOne(req.params.id);

    res.json({movies, users});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getMovieById = async (req, res) => {
  const id = parseInt(req.params.id);
  const movieManager = new MovieManager();

  try {
    const movie = await movieManager.getOne(id);
    if (movie === null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
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

const putMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      `update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?`,
      [title, director, year, color, duration, id]
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

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query(`delete from movies where id = ?`, [id])
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

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
  deleteMovie,
  getFirst,
};
