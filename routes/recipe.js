/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { recipe } = request.body;
  console.log(recipe);
  const user_id = 1;
  pool.query(
    `INSERT INTO recipe (title, description, ingredient, user_id) VALUES (?, ?, ?, ?)`,
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

router.get('/', function (request, response) {
  pool.query('SELECT * FROM recipe', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.put('/', (request, response) => {
  const { putRecipe } = request.body;
  const putRecipeId = putRecipe.id;
  console.log(putRecipe);
  pool.query(
    'UPDATE recipe SET ? WHERE id = ?',
    [putRecipe, putRecipeId],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        console.log(results);
        response.status(200).send(results);
      } else {
        response.sendStatus(404);
      }
    }
  );
});

module.exports = router;
