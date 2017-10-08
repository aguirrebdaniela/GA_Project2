const router = require('express').Router();
const Country = require('../models/countries');
//const Trip = require('../models/trips');

router.get('/', Country.findAll, (req, res) => {
  const {countries} = res.locals;
  res.render('countries/countries-list', {countries});

})

router.get('/:id', Country.findById, (req, res)=>{
  const {country} = res.locals;
  res.render('countries/countries-show', country)
})


module.exports = router;