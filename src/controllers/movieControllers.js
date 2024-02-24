//const movies = [];

const database = require("../../database");

const getMovies = (req, res) => {
  const reqQueryKeys = Object.keys(req.query);
  const reqQueryValues = Object.values(req.query);
  
  const sqlWhereParams = reqQueryKeys.map(key => {
    if (key.includes('max')) {
      return `${key.replace('max_', '')} <= ?`
    } else if (key.includes('min')) {
      return `${key.replace('min_', '')} >= ?`
    } else {
      return `${key} = ?`
    }
  });

  let sqlQuery = 'select* from movies';
  if (sqlWhereParams.length === 1) {
    sqlQuery = `${sqlQuery} where ${sqlWhereParams[0]}`;
  } else if (sqlWhereParams.length > 1) {
    sqlQuery = `${sqlQuery} where ${sqlWhereParams.join(" and ")}`;
  }

  sqlArray = reqQueryValues;

  database
  .query(sqlQuery, sqlArray)
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

const putMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    director,
    year,
    color,
    duration
  } = req.body;

  database
    .query(
      "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? WHERE id = ?",
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
}

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM movies WHERE id = ?", [id])
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
};
