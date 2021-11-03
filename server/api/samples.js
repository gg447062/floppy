const router = require('express').Router();
const { Floppy, Sample } = require('../db');
const samples = require('../../seed');

// GET /api/samples
router.get('/', async (req, res, next) => {
  try {
    // const allSamples = await Floppy.findAll({ include: Sample });
    // res.send(allSamples);

    res.send(samples);
  } catch (error) {
    next(error);
  }
});

// PUT api/samples/id=?
router.put('/:id', async (req, res, next) => {
  try {
    // const sample = Sample.findByPk(req.params.id);
    // await sample.update({ unlocked: true });
    // res.send(sample);
    res.send('hit sample number ' + req.params.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
