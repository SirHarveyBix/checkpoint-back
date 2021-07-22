const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  console.log(request.body);
  const { user } = request.body;
  if (!user.pseudo || !user.password) {
    response
      .status(400)
      .send('Veuillez sasir votre mot de passe ou votre pseudo');
  } else {
    pool.query(
      'SELECT * FROM user WHERE pseudo = ?',
      [user.pseudo],
      (error, results) => {
        if (error) {
          response.status(500).send(error);
        } else if (results.length === 0) {
          response.status(403).send(`invalid pseudo`);
        } else {
          bcrypt.compare(
            user.password,
            results[0].password,
            (error, responseCrypted) => {
              if (responseCrypted) {
                const userFound = {
                  id: results[0].id,
                };
                console.log(responseCrypted);
                response.status(200).send({ userFound });
              } else if (error) {
                console.log(error);
                response.send(error);
              } else {
                console.log(error);

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
