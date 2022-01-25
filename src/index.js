const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
const { createConn } = require('./lib/dbConn');
const { AdsController } = require('./ads/ads.controller');
const { AdsRepository } = require('./ads/ads.repository');
const { AdsService } = require('./ads/ads.service');

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

async function run() {
  const pool = await createConn(DB_USER, DB_PASSWORD, DB_NAME);

  const adsRepository = new AdsRepository(pool);
  const adsService = new AdsService(adsRepository);
  const adsController = new AdsController(adsService);

  const adsRouter = adsController.run();

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/ad', adsRouter);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
  })
}

run();
