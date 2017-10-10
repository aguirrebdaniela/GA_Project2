const router = require('express').Router();
const Want = require('../models/wants');
const User = require('../models/user');
//const Trip = require('../models/trips');

// router.get('/', Want.findAll, (req, res) => {
//   const {wants} = res.locals;
//   res.render('wants/wants-list', {wants});
// })

router.get('/', 
	User.findByEmailMiddleware,
    (req, res) => {
        Want.findAll (req, res, res.locals.userData.id, function () {
					  const {wants} = res.locals;
					  res.render('wants/wants-list', {wants});
				})		
	})

router.get('/new', (req, res)=>{
  // auth.restrict,
  res.render('wants/new');
})

router.post('/', User.findByEmailMiddleware,
    // auth.restrict,
    (req, res) => {
    	Want.create (req,res, res.locals.userData.id, function(){ 
			  const {want} = res.locals;
			  res.json(want);
			})
})


router.delete('/:id', Want.destroy, (req, res) => {
  res.send('want deleted');
})

module.exports = router;