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

router.get('/', (request, response) => {
  const { pseudo, password } = request.body;
  if (!pseudo || !password) {
    response
      .status(400)
      .send('Veuillez sasir votre mot de passe ou votre pseudo');
  } else {
    pool.query(
      'SELECT * FROM user WHERE email = ?',
      [pseudo],
      (error, results) => {
        if (error) {
          response.status(500).send(error);
        } else if (results.length === 0) {
          response.status(403).send(`invalid pseudo`);
        } else {
          bcrypt.compare(
            password,
            results[0].password,
            (error, responseCrypted) => {
              if (responseCrypted) {
                const user = {
                  id: results[0].id,
                  email: results[0].email,
                };
                response.status(200).send({ user });
              } else if (error) {
                response.send(error);
              } else {
                response.status(403).send('Votre mot de passe est eronné');
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
