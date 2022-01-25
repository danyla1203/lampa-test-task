const { IncorrectData } = require("../lib/errors");

class AdsService {
  constructor(repository) {
    this.repository = repository;
  }

  getAds(page, sortBy, sortOrder) {
    if (!page) throw new IncorrectData(406, 'Incorrect data');
    let from = parseInt(page);
    let to = parseInt(page) + 9;
    if (!sortBy && !sortOrder) {
      return this.repository.findAds(from, to);
    } else if (sortBy && !sortOrder) {
      if (sortBy != 'date' && sortBy != 'price') {
        throw new IncorrectData(406, 'Sort is possible only by price or date');
      }
      return this.repository.findSortedAds(from, to, sortBy, 'asc');
    } else if (sortBy && sortOrder) {
      if (sortOrder != 'asc' && sortOrder != 'desc') {
        throw new IncorrectData(406, 'Sort order possible value: asc, desc');
      }
      return this.repository.findSortedAds(from, to, sortBy, sortOrder);
    }
  }
}
module.exports.AdsService = AdsService;