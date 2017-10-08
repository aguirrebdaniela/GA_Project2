const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'project2',
  user: 'danielaaguirre'
}

const db = pgp(connectionSettings);
module.exports = db;
