/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { parcours } = request.body;
  console.log(parcours);
  const user_id = 1;
  pool.query(
    `INSERT INTO parcours(title, description, date, user_id) VALUES (?, ?, ?, ?)`,
    [parcours.title, parcours.description, parcours.date, user_id],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...parcours,
        });
      }
    }
  );
});

// router.get('/', function (request, response) {
//   pool.query('SELECT * FROM documentation', (error, results) => {
//     if (error) {
//       response.status(500).send(error);
//     } else {
//       response.send(results);
//     }
//   });
// });

// trouver avec id
// router.get('/:id', function (request, response) {
//   const { id } = request.params;
//   pool.query(
//     'SELECT * FROM documentation WHERE id = ?',
//     [id],
//     (error, results) => {
//       if (error) {
//         response.status(500).send(error);
//       } else if (results.length > 0) {
//         response.send(results[0]);
//       } else {
//         response.sendStatus(404);
//       }
//     }
//   );
// });

module.exports = router;
