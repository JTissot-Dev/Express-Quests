//const movies = [];

const database = require("../../database");

const getMovies = (req, res) => {
  database
  .query("select* from movies")
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select* from movies where id = ?", [id])
  .then(([movie]) => {
    if (movie[0]) {
      res.json(movie[0]);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const postMovie = (req, res) => {
  const {
    title,
    director,
    year,
    color,
    duration
  } = req.body;
  
  database
    .query(
      "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
