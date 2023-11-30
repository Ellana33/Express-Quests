const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT;

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies-first/:id", movieControllers.getFirst);

app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUser);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.post("/api/users", validateUser, userControllers.postUser);

app.put("/api/movies/:id",validateMovie, movieControllers.putMovie);
app.put("/api/users/:id", validateUser, userControllers.putUser);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", userControllers.deleteUser);

module.exports = app;
