const express = require('express');
const cors = require('cors');
const user = require('./routes/user');
const parcours = require('./routes/parcours');
const recipe = require('./routes/recipe');
const login = require('./routes/login');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.static('public'));
// TODO: add your routes here
app.use('/user', user);
app.use('/parcours', parcours);
app.use('/recipe', recipe);
app.use('/login', login);
module.exports = app;
