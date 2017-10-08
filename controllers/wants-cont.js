const router = require('express').Router();
const Want = require('../models/wants');
//const Trip = require('../models/trips');

router.get('/', Want.findAll, (req, res) => {
  const {wants} = res.locals;
  res.render('wants/wants-list', {wants});
})

router.post('/', Want.create, (req,res) => {
  const {want} = res.locals;
  res.json(want);
})

router.delete('/:id', Want.destroy, (req, res) => {
  res.send('want deleted');
})

module.exports = router;