const pg = require('pg');
const Redis = require('ioredis');

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

async function createRedisConn () {
  const client = new Redis();
  
  return client;
}

module.exports = {
  createConn: createConn,
  createRedisConn: createRedisConn
}

