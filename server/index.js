const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

//logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '..', '/public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', require('./api'));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
