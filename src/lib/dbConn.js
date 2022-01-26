const pg = require('pg');
const Redis = require('ioredis');

function createConn
(
  DB_USER, 
  DB_PASSWORD, 
  DB_NAME
) {
  let cl = new pg.Client({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });
  cl.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  });
  return cl;
}

async function createRedisConn() {
  let client = new Redis({ host: process.env.REDIS_HOST });
  return client;
}

module.exports = {
  createConn: createConn,
  createRedisConn: createRedisConn
}

