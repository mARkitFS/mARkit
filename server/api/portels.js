const router = require('express').Router();
const { Portel } = require('../db/models');
module.exports = router;

//All routes for /api/portels

router.post('/add', async (req, res, next)=>{
  try{
    const newPortel = await Portel.create(req.body)
    res.json(newPortel)
  }catch(err){
    next(err)
    }
  })
