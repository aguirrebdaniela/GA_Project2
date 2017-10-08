const db = require('../db/config');
const Want = {};

Want.findAll = (req, res, next) => {
  db.manyOrNone(`SELECT * FROM wants`)
    .then(wants => {
      res.locals.wants = wants;
      next();
    })
    .catch(err => console.log(err))
}

Want.create = (req, res, next) => {
  const {city} = req.body;
  db.one(`INSERT INTO wants (city) VALUES($1) RETURNING *`, [city])
    .then(want => {
      res.locals.want = want;
      next();
    })
    .catch(err => console.log(err));
}


Want.destroy = (req, res, next) => {
  const {id} = req.params;
  db.none(`DELETE FROM wants WHERE id = $1`, [id])
    .then(()=> next())
    .catch(err => console.log(err));
}


module.exports = Want;