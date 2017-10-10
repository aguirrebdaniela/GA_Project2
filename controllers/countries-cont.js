const router = require('express').Router();
const Country = require('../models/countries');
const Trip = require('../models/trips');

router.get('/', Country.findAll, (req, res) => {
  const {countries} = res.locals;
  res.render('countries/countries-list', {countries});

})


router.get('/:id', Country.findById, (req, res)=>{
    	var countryname = res.locals.country.countryname;
    	Country.findImage (req, res, countryname, function(){ 
			  const {country} = res.locals;
				console.log(country)

			  var countryId = country.id;
			 Country.findCountryInformation (req, res, countryname, countryId, function(){ 
			  var countries= res.locals.imageUrls;
			  var countryInformation = res.locals.countryInformation
 // 			countryInformation.id = country.id;
  		Country.editInformation (req, res, countryInformation,  function(){ 
  		
  			res.render('countries/countries-show', {
  				country:country, 
  				countries:countries,
  				countryInformation: countryInformation})

				})
	 	})
})
})



module.exports = router;