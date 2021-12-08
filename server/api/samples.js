const router = require('express').Router();
const Moralis = require('moralis/node');

// GET /api/samples
router.get('/', async (req, res, next) => {
  try {
    const query = new Moralis.Query('Sample');
    query.equalTo('unlocked', true);
    const allSamples = await query.find();
    res.send(allSamples);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
