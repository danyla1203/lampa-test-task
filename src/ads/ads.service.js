const { IncorrectData } = require("../lib/errors");

class AdsService {
  constructor(repository) {
    this.repository = repository;
  }

  getAd(id, additionalFields) {
    if (!id) throw new IncorrectData(406, 'Incorrect data');
    try {
      additionalFields = additionalFields.split(',');
    } catch (e) {
      throw new IncorrectData(406, 'fields isn\'t correct');
    }
    if(!Array.isArray(additionalFields)) throw new IncorrectData(406, 'fields isn\'t correct');
    let fields = [];
    if (additionalFields.includes('photos')) fields.push('photos_link');
    if (additionalFields.includes('description')) fields.push('description');
    if (fields.length < 1) throw new IncorrectData(406, 'fields isn\'t correct');
    return this.repository.findAd(id, fields);
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