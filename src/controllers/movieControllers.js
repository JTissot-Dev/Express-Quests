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

module.exports = {
  getMovies,
  getMovieById,
};
