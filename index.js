const express = require('express');
require('dotenv').config();

const cors = require('cors');
const app = require('./app');

app.use(express.json());

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.static('public'));
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
