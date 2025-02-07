const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT;

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", movieControllers.getUser);

app.get("/api/users/:id", movieControllers.getUserById);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", movieControllers.postUser);

module.exports = app;
