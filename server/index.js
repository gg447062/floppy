const express = require('express');
const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

//logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '..', '/public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/image/:url', async (req, res, next) => {
  try {
    const fullUrl = `https://gateway.moralisipfs.com/ipfs/${req.params.url}`;
    const response = await axios.get(fullUrl, {
      responseType: 'arraybuffer',
    });

    res.send(response.data.toString('base64'));
  } catch (error) {
    next(error);
  }
});

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'));
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
