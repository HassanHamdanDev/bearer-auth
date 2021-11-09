'use strict';


// 3rd Party Resources
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 3006;

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRouter = require('./auth/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Server Up on ${PORT}`);
  });
}

module.exports = {
  server: app,
  start: start
};
