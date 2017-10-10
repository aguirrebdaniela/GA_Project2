const db = require('../db/config');
const Want = {};

Want.findAll = (req, res, username, next) => {
  db.manyOrNone(`SELECT * FROM wants WHERE user_id=$1`, [username])
    .then(wants => {
      res.locals.wants = wants;
      next();
    })
    .catch(err => console.log(err))
}



Want.create = (req, res, user_id, next) => {
  const {city} = req.body;
  db.one(`INSERT INTO wants (city, user_id) VALUES($1, $2) RETURNING *`, [city, user_id])
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