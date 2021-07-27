/* eslint-disable camelcase */
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const { MulterError } = require('multer');
const pool = require('../config/mysql');

const uploadFile = multer({
  limits: { fileSize: Infinity },
  fileFilter: (request, file, callBack) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      callBack(null, true);
    } else {
      callBack(new MulterError('erreur'));
    }
  },
  dest: 'temp/',
});
router.post('/', uploadFile.single('file'), (request, response) => {
  const recipe = request.body;
  const user_id = 1;
  const getFile = `recipe/${recipe.title}-${Date.now()}`;
  const folder = `public/${getFile}/`;
  const file = `${getFile}/${request.file.originalname}`;
  fs.mkdirSync(folder, { recursive: true });
  fs.rename(request.file.path, `public/${file}`, (fsError) => {
    if (fsError) response.status(500).send(fsError);
    else {
      pool.query(
        `INSERT INTO recipe (file, title, description, ingredient, user_id) VALUES (?, ?, ?, ?, ?)`,
        [file, recipe.title, recipe.description, recipe.ingredient, user_id],
        (error, results) => {
          if (error) response.status(500).send(error);
          else
            response.status(201).send({
              id: results.insertId,
              ...recipe,
            });
        }
      );
    }
  });
});

router.get('/', (request, response) => {
  pool.query('SELECT * FROM recipe', (error, results) => {
    if (error) response.status(500).send(error);
    else response.send(results);
  });
});

router.put('/', (request, response) => {
  const { putRecipe } = request.body;
  const putRecipeId = putRecipe.id;
  pool.query(
    'UPDATE recipe SET ? WHERE id = ?',
    [putRecipe, putRecipeId],
    (error, results) => {
      if (error) response.status(500).send(error);
      else if (results.affectedRows > 0) response.status(200).send(results);
      else response.sendStatus(404);
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('DELETE FROM recipe WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
