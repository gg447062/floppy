const router = require('express').Router();

router.use('/ipfs', require('./ipfs'));
router.use('/image', require('./image'));
router.use('/asset-image', require('./assetImage'));

router.use((req, res, next) => {
  const err = new Error('Route not found!!');
  err.status = 404;
  next(err);
});

module.exports = router;
