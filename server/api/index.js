const router = require('express').Router();
module.exports = router;

//All routes for /api
router.use('/portals', require('./portals'));
router.use('/users', require('./users'));
router.use('/elements', require('./elements'));
router.use('/elementprops', require('./elementprops'));
router.use('/backgrounds', require('./backgrounds'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
