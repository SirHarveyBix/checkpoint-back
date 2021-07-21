const express = require('express');
const cors = require('cors');
const user = require('./routes/user');
const parcours = require('./routes/parcours');
const recipe = require('./routes/recipe');

const app = express();
app.use(express.json());
app.use(cors());
// TODO: add your routes here
app.use('/user', user);
app.use('/parcours', parcours);
app.use('/recipe', recipe);
module.exports = app;
