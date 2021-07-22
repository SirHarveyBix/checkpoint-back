const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const user = request.body;

  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      console.log(error);
      response.status(500).send(error);
    } else {
      pool.query(
        'INSERT INTO user (pseudo, password, email) VALUES (?,?,?)',
        [user.email, hash, user.email],
        (err, results) => {
          if (err) {
            response.status(500).send(err);
            console.log(err);
          } else {
            response.status(201).send({ id: results.insertId });
            console.log(results);
          }
        }
      );
    }
  });
});

module.exports = router;
