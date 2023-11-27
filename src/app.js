const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT;

const app = express();

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);

app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "John",
            email: "john@gmail.com"
        },
        {
            id: 2,
            name: "Bob",
            email: "bob@gmail.com"
        },
        {
            id: 3,
            name: "Shannon",
            email: "shannon@gmail.com"
        },
    ];
    res.status(200).json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const users = [
        {
            id: 1,
            name: "John",
            email: "john@gmail.com"
        },
        {
            id: 2,
            name: "Bob",
            email: "bob@gmail.com"
        },
        {
            id: 3,
            name: "Shannon",
            email: "shannon@gmail.com"
        },
    ];
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.sendStatus(404);
    }
});

module.exports = app;
