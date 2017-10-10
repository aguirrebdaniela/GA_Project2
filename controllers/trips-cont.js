const router = require('express').Router();
const Trip = require('../models/trips');
const User = require('../models/user');
const Country = require('../models/countries');
// const Country = require('../models/countries');

router.get('/', 
	User.findByEmailMiddleware,
    (req, res) => {
        Trip.findAll (req, res, res.locals.userData.id, function () {
					  const {trips} = res.locals;
					  res.render('trips/trips-list', {trips});
				})		
	})


// router.get('/', Trip.findAll, (req, res, username) => {
//   const {trips} = res.locals;
//   res.render('trips/trips-list', {trips});
// })

router.get('/new', (req, res)=>{
  // auth.restrict,
  res.render('trips/new');
})

// router.get('/:id', Trip.findById, (req, res)=>{
//   const {trip} = res.locals;
//   console.log(trip)
//   res.render('trips/trips-show', trip);
// })

router.get('/:id', Trip.findById, (req, res)=>{
      var city = res.locals.trip.city+ " city";
      Country.findImage (req, res, city, function(){ 
        const {trip} = res.locals;
        var cities= res.locals.imageUrls
         res.render('trips/trips-show', {trip: trip, cities: cities});
      })
})

router.get('/:id/edit', Trip.findById, (req, res) => {
  const {trip} = res.locals;
  res.render('trips/edit', trip);
})

router.post('/', User.findByEmailMiddleware,
    // auth.restrict,
    (req, res) => {
    	Trip.create (req,res, res.locals.userData.id, function(){ 
			  const {trip} = res.locals;
			  res.json(trip);
			})
})

router.put('/:id', Trip.edit, (req, res) => {
  const {trip} = res.locals;
  res.json(trip);
})

router.delete('/:id', Trip.destroy, (req, res) => {
  res.send('Trip deleted');
})

module.exports = router;