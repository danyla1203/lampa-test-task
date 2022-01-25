const { CustomRouter } = require("../lib/customRouter");

class AdsController {
  constructor(adsService) {
    this.service = adsService;
    this.router = new CustomRouter();
  }
  run() {
    this.router.get('/list', (req, res) => {
      const page = req.query.page;
      const sortBy = req.query.sort;
      const sortOrder = req.query.order;
      return this.service.getAds(page, sortBy, sortOrder);
    })
    this.router.get('/:id', (req, res) => {
      let additionalFields = req.query.fields;
      let id = req.params.id;
      return this.service.getAd(id, additionalFields);
    })
    return this.router.router;
  }
}

module.exports.AdsController = AdsController;