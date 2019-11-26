const router = require('express').Router();
const { ElementProp } = require('../db/models');
module.exports = router;

//All routes for /api/elementprops
router.get('/', async (req, res, next) => {
  try {
    const elementprops = await ElementProp.findAll();
    res.json(elementprops);
  } catch (err) {
    next(err);
  }
});

router.get('/:elementId/:portalId', async (req, res, next) => {
  try {
    const element = await ElementProp.findByPk(req.params.elementId);
    res.json(element);
  } catch (err) {
    next(err);
  }
});
