const { CustomRouter } = require("../lib/customRouter");

class AdsController {
  constructor(adsService) {
    this.service = adsService;
    this.router = new CustomRouter();
  }
  run() {
    this.router.get('', (req, res) => {
      return {};
    })
    return this.router.router;
  }
}

module.exports.AdsController = AdsController;