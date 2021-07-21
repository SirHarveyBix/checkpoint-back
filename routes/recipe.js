/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { recipe } = request.body;
  console.log(recipe);
  const user_id = 1;
  pool.query(
    `INSERT INTO recipe(title, description, ingredient, user_id) VALUES (?, ?, ?, ?)`,
    [recipe.title, recipe.description, recipe.ingredient, user_id],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...recipe,
        });
      }
    }
  );
});
module.exports = router;
