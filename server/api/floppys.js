const router = require('express').Router();
const { Floppy, Sample } = require('../db');

// GET /api/floppys
router.get('/', async (req, res, next) => {
  try {
    const allFloppySamples = await Floppy.findAll({
      include: [{ model: Sample, where: { unlocked: true } }],
    });

    res.send(allFloppySamples);
  } catch (error) {
    next(error);
  }
});

// GET /api/floppys/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleFloppySamples = await Floppy.findByPk(req.params.id, {
      include: [{ model: Sample, where: { unlocked: true } }],
    });

    res.send(singleFloppySamples);
  } catch (error) {
    next(error);
  }
});

// PUT /api/floppys/:id
router.put('/:id', async (req, res, next) => {
  try {
    const locked = await Sample.findAll({
      where: {
        floppyId: req.params.id,
        unlocked: false,
      },
    });

    if (locked.length) {
      await locked[0].update({ unlocked: true });
    }
    const unlocked = await Floppy.findByPk(req.params.id, {
      include: [{ model: Sample, where: { unlocked: true } }],
    });
    res.send(unlocked);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
