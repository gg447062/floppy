const router = require('express').Router();
const axios = require('axios');

const url = 'https://wnlemx8gwe.execute-api.us-west-2.amazonaws.com/prod';

router.post('/', async (req, res, next) => {
  try {
    const data = JSON.stringify(req.body);

    const config = {
      method: 'post',
      url: url,
      headers: {
        'x-api-key': process.env.EC2_API_KEY,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);
    res.send(response.data);
  } catch (error) {
    console.log(error.config);
    next(error);
  }
});

module.exports = router;
