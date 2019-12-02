const router = require('express').Router();
const { ElementProp, Element } = require('../db/models');
const Sequelize = require('sequelize')
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

router.get('/portal/:portalId', async (req, res, next) => {
  try {
    const elementProp = await ElementProp.findAll({
      where :{portalId: req.params.portalId},
      attributes:['position','scale'],
      include: [{model: Element, attributes: ['type','name']}]
    })
    element = elementProp.map(el => {
      let newObj = {}
      newObj.position = el.position
      newObj.type = el.element.type
      newObj.name = el.element.name
      newObj.scale = el.scale
      return newObj
    })
    res.json(element);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res, next)=>{
  try{
    const newElementProp = await ElementProp.create(req.body)
    res.json(newElementProp)
  }catch(err){
    next(err)
    }
  })
