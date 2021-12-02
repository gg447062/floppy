const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

//logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set COOP and COER headers so ffmpeg.wasm works
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// static middleware
app.use(express.static(path.join(__dirname, '..', '/public')));

app.use('/api', require('./api'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
