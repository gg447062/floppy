const router = require('express').Router();

router.use('/samples', require('./samples'));
router.use('/floppys', require('./floppys'));
// router.use('/record', require('./record'));

router.use((req, res, next) => {
  const err = new Error('Route not found!!');
  err.status = 404;
  next(err);
});

module.exports = router;
