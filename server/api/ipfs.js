const axios = require('axios');
const router = require('express').Router();

router.post('/assets', async (req, res, next) => {
  try {
    const { front, back } = req.body;

    const options = {
      method: 'POST',
      url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': process.env.MORALIS_API_KEY,
      },
      data: [
        {
          content: front.content,
          path: front.path,
        },
        {
          content: back.content,
          path: back.path,
        },
      ],
    };

    const { data } = await axios.request(options);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/metadata', async (req, res, next) => {
  try {
    const { content, path } = req.body;
    const options = {
      method: 'POST',
      url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-Key': process.env.MORALIS_API_KEY,
      },
      data: [
        {
          content,
          path,
        },
      ],
    };
    const { data } = await axios.request(options);
    const hash = data[0].path;
    res.send(hash);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
