const router = require('express').Router();
const Trip = require('../models/trips');
// const Country = require('../models/countries');

router.get('/', Trip.findAll, (req, res) => {
  const {trips} = res.locals;
  res.render('trips/trips-list', {trips});
})

router.get('/new', (req, res)=>{
  res.render('trips/new');
})

router.get('/:id', Trip.findById, (req, res)=>{
  const {trip} = res.locals;
  console.log(trip)
  res.render('trips/trips-show', trip);
})

router.get('/:id/edit', Trip.findById, (req, res) => {
  const {trip} = res.locals;
  console.log(trip)
  res.render('trips/edit', trip);
})

router.post('/', Trip.create, (req,res) => {
  const {trip} = res.locals;
  res.json(trip);
})

router.put('/:id', Trip.edit, (req, res) => {
  const {trip} = res.locals;
  res.json(trip);
})

router.delete('/:id', Trip.destroy, (req, res) => {
  res.send('Trip deleted');
})

module.exports = router;