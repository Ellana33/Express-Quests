const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT;

const app = express();

app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUser);
app.get("/api/users/:id", userControllers.getUserById);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", userControllers.postUser);

app.put("/api/movies/:id", movieControllers.putMovie);
app.put("/api/users/:id", userControllers.putUser);

module.exports = app;
