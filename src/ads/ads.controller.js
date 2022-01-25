const { CustomRouter } = require("../lib/customRouter");

class AdsController {
  constructor(adsService) {
    this.service = adsService;
    this.router = new CustomRouter();
  }
  run() {
    this.router.get('/list', (req, res) => {
      const page = parseInt(req.query.page);
      const sortBy = req.query.sort;
      const sortOrder = req.query.order;
      return this.service.getAds(page, sortBy, sortOrder);
    })
    this.router.get('/:id', (req, res) => {
      const additionalFields = req.query.fields;
      const id = parseInt(req.params.id);
      return this.service.getAd(id, additionalFields);
    })
    this.router.post('', async (req, res) => {
      return (await this.service.insertAdd(req.body)).rows[0];
    })
    return this.router.router;
  }
}

module.exports.AdsController = AdsController;
