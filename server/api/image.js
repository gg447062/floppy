const axios = require('axios');
const router = require('express').Router();

// /image/:url
router.post('/', async (req, res, next) => {
  try {
    const fullUrl = `https://gateway.moralisipfs.com/ipfs/${req.body.url}`;
    const response = await axios.get(fullUrl, {
      responseType: 'arraybuffer',
    });

    res.send(response.data.toString('base64'));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
