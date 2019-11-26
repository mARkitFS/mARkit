const router = require('express').Router();
const { Background } = require('../db/models');
module.exports = router;

//All routes for /api/backgrounds
router.get('/', async (req, res, next) => {
  try {
    const backgrounds = await Background.findAll();
    res.json(backgrounds);
  } catch (err) {
    next(err);
  }
});

router.get('/:backgroundId', async (req, res, next) => {
  try {
    const background = await Background.findByPk(req.params.backgroundId);
    res.json(background);
  } catch (err) {
    next(err);
  }
});
