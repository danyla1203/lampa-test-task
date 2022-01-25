const dotenv = require('dotenv');
const { createConn } = require('./lib/dbConn');

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

async function run() {
  const pool = await createConn(DB_USER, DB_PASSWORD, DB_NAME);
}

run();
