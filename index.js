const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = require('./app');

app.use(express.json());

const port = process.env.PORT || 8080;
console.log(process.env.PORT);
app.use(cors());

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
