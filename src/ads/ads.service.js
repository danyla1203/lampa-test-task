const { IncorrectData } = require("../lib/errors");

class AdsService {
  constructor(repository) {
    this.repository = repository;
  }

  allFieldsProvided(fields) {
    const mustBe = ['title', 'description', 'photos_link', 'price'];
    let fieldsKeys = Object.keys(fields);
    for (let i = 0; i < mustBe.length; i++) {
      if (!fieldsKeys.includes(mustBe[i])) {
        return false;
      }
    }
    return true;
  }

  insertAdd(fields) {
    if (!this.allFieldsProvided(fields)) throw new IncorrectData(406, 'not all fields');
    let { title, description, photos_link, price } = fields;
    if (title.length > 200) throw new IncorrectData(406, 'title is too big');
    if (description.length > 1000) throw new IncorrectData(406, 'description is too big');
    try {
      photos_link = JSON.parse(photos_link);
    } catch(e) {
      throw new IncorrectData(406, 'photos_link must be valid json array');
    }
    if (!Array.isArray(photos_link)) throw new IncorrectData(406, 'photos_link must be array');
    if (photos_link.length > 3) throw new IncorrectData(406, 'too much photos');

    return this.repository.saveAdd(title, description, photos_link, price);
  }

  getAd(id, additionalFields) {
    if (!id) throw new IncorrectData(406, 'Incorrect data');
    try {
      additionalFields = additionalFields.split(',');
    } catch (e) {
      throw new IncorrectData(406, 'fields isn\'t correct');
    }
    if(!Array.isArray(additionalFields)) throw new IncorrectData(406, 'fields isn\'t correct');
    const fields = [];
    if (additionalFields.includes('photos')) fields.push('photos_link');
    if (additionalFields.includes('description')) fields.push('description');
    if (fields.length < 1) throw new IncorrectData(406, 'fields isn\'t correct');
    return this.repository.findAd(id, fields);
  }

  getAds(page, sortBy, sortOrder) {
    if (!page) throw new IncorrectData(406, 'Incorrect data');
    const from = parseInt(page);
    const to = parseInt(page) + 9;
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
