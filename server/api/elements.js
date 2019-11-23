const router = require('express').Router();
const { Element } = require('../db/models');
module.exports = router;

//All routes for /api/elements
router.get('/', async (req, res, next) => {
  try {
    // const element = await Element.findAll();
    // console.log('<<<<<<<<<<<<,element information: ', element)
    // res.json(element);
    res.send('Hello yall')
  } catch (err) {
    next(err);
  }
});

router.get('/:elementId', async (req, res, next) => {
  console.log('<<<<<<<<<elementID: ', req.params.elementId)
  try {
    const element = await Element.findByPk(req.params.elementId);
    console.log('<<<<<<<<<<<<,element information: ')
    res.json(element);
  } catch (err) {
    next(err);
  }
});
