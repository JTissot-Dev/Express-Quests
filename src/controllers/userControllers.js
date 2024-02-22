const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select* from users")
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

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
};