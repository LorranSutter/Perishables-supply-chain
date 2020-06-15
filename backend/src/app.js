require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const compression = require('compression');
const cors = require('cors');

const distributor = require('./routes/distributor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use('/distributors', distributor);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;