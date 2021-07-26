/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { parcours } = request.body;
  const user_id = 1;
  pool.query(
    `INSERT INTO parcours(title, description, date, user_id) VALUES (?, ?, ?, ?)`,
    [parcours.title, parcours.description, parcours.date, user_id],
    (error, results) => {
      if (error) {
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

router.get('/', (request, response) => {
  pool.query('SELECT * FROM parcours', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.put('/', (request, response) => {
  const { putParcours } = request.body;
  pool.query(
    'UPDATE parcours SET ? WHERE id = ?',
    [putParcours, putParcours.id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.status(200).send(results);
      } else {
        response.sendStatus(404);
      }
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('DELETE FROM parcours WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
