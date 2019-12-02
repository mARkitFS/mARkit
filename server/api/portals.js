const router = require('express').Router();
const { Portal } = require('../db/models');
module.exports = router;

//All routes for /api/portals
router.get('/', async (req, res, next) => {
  try {
    const portals = await Portal.findAll();
    res.json(portals);
  } catch (err) {
    next(err);
  }
});

router.get('/:portalId', async (req, res, next) => {
  try {
    const portal = await Portal.findByPk(req.params.portalId);
    res.json(portal);
  } catch (err) {
    next(err);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const portal = await Portal.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(portal);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res, next)=>{
  try{
    console.log('req body of portals post:>>>>>> ',req.body)
    const newPortal = await Portal.create(req.body)
    console.log('newPortal:>>>>',newPortal.dataValues)
    res.json(newPortal.dataValues)
  }catch(err){
    next(err)
    }
  })
