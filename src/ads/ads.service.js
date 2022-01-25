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
    if (!this.allFieldsProvided(fields)) throw new IncorrectData('not all fields');
    let { title, description, photos_link, price } = fields;
    if (title.length > 200) throw new IncorrectData('title is too big');
    if (title.length < 5) throw new IncorrectData('title is too short');
    if (description.length > 1000) throw new IncorrectData('description is too big');
    if (description.length < 10) throw new IncorrectData('description is too short');
    if (price.length < 1) throw new IncorrectData('price is incorrect');
    try {
      photos_link = JSON.parse(photos_link);
    } catch(e) {
      throw new IncorrectData('photos_link must be valid json array');
    }
    if (!Array.isArray(photos_link)) throw new IncorrectData('photos_link must be array');
    if (photos_link.length > 3) throw new IncorrectData('too much photos');

    return this.repository.saveAdd(title, description, photos_link, price);
  }

  getAd(id, additionalFields) {
    if (!id) throw new IncorrectData('Incorrect id');
    const fields = [];
    if (additionalFields) {
      additionalFields = additionalFields.split(',');
      if (additionalFields.includes('photos')) fields.push('photos_link');
      if (additionalFields.includes('description')) fields.push('description');
    } 
    return this.repository.findAd(id, fields);
  }

  getAds(page, sortBy, sortOrder) {
    if (!page || page < 0) throw new IncorrectData('Incorrect page');
    const from = page;
    const to = page + 9;
    if (!sortBy && !sortOrder) {
      return this.repository.findAds(from, to);
    } else if (sortBy && !sortOrder) {
      if (sortBy != 'date' && sortBy != 'price') {
        throw new IncorrectData('Sort is possible only by price or date');
      }
      return this.repository.findSortedAds(from, to, sortBy, 'asc');
    } else if (sortBy && sortOrder) {
      if (sortOrder != 'asc' && sortOrder != 'desc') {
        throw new IncorrectData('Sort order possible value: asc, desc');
      }
      return this.repository.findSortedAds(from, to, sortBy, sortOrder);
    }
  }
}
module.exports.AdsService = AdsService;
