const db = require('../db/config');
const Country = {};
const axios = require('axios');

const PHOTO_ID = process.env.PHOTO_ID;
const PHOTO_SECRET = process.env.PHOTO_SECRET;

Country.findAll = (req, res, next) => {
  db.manyOrNone(`SELECT * FROM countries`)
    .then(countries => {
      res.locals.countries = countries;
      next();
    })
    .catch(err => console.log(err))
}

Country.findById = (req, res, next) => {
  const {id} = req.params;
  db.oneOrNone(`SELECT * FROM countries WHERE id = $1 `, [id])
    .then(country => {
      res.locals.country = country;
      next();
    })
    .catch(err => console.log(err));
}

const BgImage = {}
const CLIENT_ID = "cb57ffd960906b09326e6773af851c9a6e9a158e0541bb04e17b3461418245bd"
Country.findImage = (req, res, country, next) => {
  var results = new Array();
  axios.get("https://api.unsplash.com/search/photos?page=1&query="+ country +"&client_id="+ CLIENT_ID)
    .then((r) => {
    r.data.results.forEach(function(entry) {
        var result = entry;
        results.push(result.urls.raw)
     // console.log(entry)
    });

      res.locals.imageUrls = results;
      next();
    })
    .catch((err) => {
      console.log(err)
    })
}

Country.findCountryInformation = (req, res, country, countryId, next) => {
  var results = new Array();
  axios.get("https://restcountries.eu/rest/v2/name/"+ country)
    .then((r) => {
        var countryInformation = null;
        r.data.forEach(function(entry) {
            countryInformation = {
                id: countryId,
                capital : entry.capital,
                region: entry.region,
                population: entry.population,
                area: entry.area,
                currency: entry.currencies[0].name,
                language: entry.languages[0].name,
                flag: entry.flag
            }    
        });
      res.locals.countryInformation = countryInformation;
      next();
    })
    .catch((err) => {
      console.log(err)
    })
}

Country.editInformation = (req, res, country, next) => {
  db.oneOrNone(`UPDATE countries SET
      population = $1, area = $2, currency=$3, language=$4, flag=$5
      WHERE id = $6 RETURNING *`, [country.population, country.area, country.currency, country.language, country.flag, country.id])
    .then(country => {
      res.locals.country = country;
      next();
    })
    .catch(err => console.log(err));
}


module.exports = BgImage
module.exports = Country;