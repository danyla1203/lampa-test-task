const pg = require('pg');

function createConn
(
  DB_USER, 
  DB_PASSWORD, 
  DB_NAME
) {
  return new pg.Pool({
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
  });
}

module.exports = { createConn: createConn }
