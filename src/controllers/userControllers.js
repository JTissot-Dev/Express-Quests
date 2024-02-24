const database = require("../../database");

const getUsers = (req, res) => {
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

  let sqlQuery = 'select* from users';
  if (sqlWhereParams.length === 1) {
    sqlQuery = `${sqlQuery} where ${sqlWhereParams[0]}`;
  } else if (sqlWhereParams.length > 1) {
    sqlQuery = `${sqlQuery} where ${sqlWhereParams.join(" and ")}`;
  }

  sqlArray = reqQueryValues;

  database
    .query(sqlQuery, sqlArray)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {

  const id = parseInt(req.params.id);

  database
    .query("select* from users where id = ?", [id])
    .then(([users]) => {
      if (users[0]) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
};

const postUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    city,
    language
  } = req.body;

  database
    .query(
      "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, city, language]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
};

const putUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    firstName,
    lastName,
    email,
    city,
    language
  } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstName, lastName, email, city, language, id]
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
    })
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};