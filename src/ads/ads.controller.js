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
    return this.router.router;
  }
}

module.exports.AdsController = AdsController;