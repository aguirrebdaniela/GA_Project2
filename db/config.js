const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'project2',
  user: 'danielaaguirre'
}

const db = pgp(process.env.DATABASE_URL || cn);
module.exports = db;
