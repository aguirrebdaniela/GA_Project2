const db = require('../db/config');
const Trip = {};

Trip.findAll = (req, res, username, next) => {
  db.manyOrNone(`SELECT * FROM trips WHERE user_id=$1`, [username])
    .then(trips => {
      res.locals.trips = trips;
      next();
    })
    .catch(err => console.log(err))
}

Trip.findById = (req, res, next) => {
  const {id} = req.params;
  db.oneOrNone(`SELECT * FROM trips WHERE id = $1 `, [id])
    .then(trip => {
      res.locals.trip = trip;
      next();
    })
    .catch(err => console.log(err));
}

Trip.create = (req, res, user_id, next) => {
  const {city, year, image, description} = req.body;
  console.log("create " + user_id)
  db.one(`INSERT INTO trips (city, year, image, description, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *`, [city, year, image, description, user_id])
    .then(trip => {
      res.locals.trip = trip;
      next();
    })
    .catch(err => console.log(err));
}

Trip.edit = (req, res, next) => {
  const {city, year, image, description} = req.body;
  const {id} = req.params;
  db.oneOrNone(`UPDATE trips SET
      city = $1, year = $2, image=$3, description=$4
      WHERE id = $5 RETURNING *`, [city, year, image, description, id])
    .then(trip => {
      res.locals.trip = trip;
      next();
    })
    .catch(err => console.log(err));
}


// Task.changeComplete = (req, res, next) => {
//   const {complete} = req.body;
//   const {id} = req.params;
//   db.oneOrNone(`UPDATE tasks SET complete = $1 WHERE id = $2`, [complete, id])
//     .then(()=> next())
//     .catch(err => console.log(err));
// }

Trip.destroy = (req, res, next) => {
  const {id} = req.params;
  db.none(`DELETE FROM trips WHERE id = $1`, [id])
    .then(()=> next())
    .catch(err => console.log(err));
}

module.exports = Trip;