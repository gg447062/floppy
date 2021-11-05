const router = require('express').Router();
const { Sample } = require('../db');

// GET /api/samples
router.get('/', async (req, res, next) => {
  try {
    const allSamples = await Sample.findAll({
      where: {
        unlocked: true,
      },
    });
    res.send(allSamples);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
