const router = require('express').Router();

router.use('/ipfs', require('./ipfs'));
router.use('/image', require('./image'));
router.use('/play', require('./play'));
router.use('/login', require('./login'))

router.use((req, res, next) => {
  const err = new Error('Route not found!!');
  err.status = 404;
  next(err);
});

module.exports = router;
