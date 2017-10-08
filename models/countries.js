const db = require('../db/config');
const Country = {};

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
  db.oneOrNone(`SELECT * FROM countries WHERE id = $1`, [id])
    .then(country => {
      res.locals.country = country;
      next();
    })
    .catch(err => console.log(err));
}

module.exports = Country;