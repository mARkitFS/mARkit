const router = require('express').Router();
const { Element } = require('../db/models');
module.exports = router;

//All routes for /api/elements
router.get('/', async (req, res, next) => {
  try {
    const elements = await Element.findAll();
    res.json(elements);
  } catch (err) {
    next(err);
  }
});

router.get('/:elementId', async (req, res, next) => {
  try {
    const element = await Element.findByPk(req.params.elementId);
    res.json(element);
  } catch (err) {
    next(err);
  }
});
