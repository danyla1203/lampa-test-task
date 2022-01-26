const { AdsService } = require('../src/ads/ads.service');
const { IncorrectData } = require('../src/lib/errors');

let repo = { 
  saveAdd: () => {},
  findAd: (id, fields) => {
    return {}
  },
  findAds: (from, to) => {
    return {}
  },
  findSortedAds: (from, to, sortBy, order) => {
    return {}
  }
};
const service = new AdsService(repo);

describe('ads service testing', () => {
  test('all fields provided with correct data', () => {
    let fields = { title: '', description: '', photos_link: '', price: '' };
    expect(service.allFieldsProvided(fields)).toBe(true);
    fields.testKey = '';
    expect(service.allFieldsProvided(fields)).toBe(true);
    fields.testKey2 = '';
    expect(service.allFieldsProvided(fields)).toBe(true);
  });
  test('all fields provided with incorrect data', () => {
    let fields = { title: '', description: '', photos_link: '', price: '' };
    delete fields.title;
    expect(service.allFieldsProvided(fields)).toBe(false);
  });
  test('insertAdd not all fields', () => {
    let fields = { 
      title: 'Testing insertAdd', 
      description: 'Testing insertAdd', 
      photos_link: '["http://one.com"]', 
    };
    let run = () => {
      service.insertAdd(fields)
    }
    expect(run).toThrowError(IncorrectData);
  });
  test('insert with incorrect value in fields', () => {
    let fields = { 
      title: 'S', 
      description: 'Testing insertAdd', 
      photos_link: '["http://one.com"]',
      price: '7000' 
    };
    let run = () => {
      service.insertAdd(fields)
    }
    expect(run).toThrowError(IncorrectData);
    fields.title = 'Testing insertAdd';
    fields.description = '';
    expect(run).toThrowError(IncorrectData);
    fields.description = 'Testing insertAdd';
    fields.photos_link = 'http://one.com';
    expect(run).toThrowError(IncorrectData);
    fields.photos_link = "['http://one.com']";
    expect(run).toThrowError(IncorrectData);
    fields.photos_link = '["http://one.com"]';
    fields.price = '0';
    expect(run).toThrowError(IncorrectData);
  });
  test('get ad testing', () => {
    let id = null;
    let fields = '';
    let run = () => {
      service.getAd(id, fields);
    }
    expect(run).toThrowError(IncorrectData);
    id = undefined;
    expect(run).toThrowError(IncorrectData);
    expect(service.getAd(10, '')).toStrictEqual({});
    expect(service.getAd('str', '')).toStrictEqual({});
  });
  test('get ads testing', () => {
    let page = 1;
    let sortBy = null;
    let order = 'asc';
  
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});

    sortBy = '';
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});
    sortBy = 'date';
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});
    sortBy = 'price';
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});

    order = 'asc';
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});
    order = 'desc';
    expect(service.getAds(page, sortBy, order)).toStrictEqual({});
  });
  test('testing get ad with incorrect params', () => {
    let page = null;
    let sortBy = null;
    let order = 'asc';
    let run = () => {
      service.getAds(page, sortBy, order);
    }

    expect(run).toThrowError(IncorrectData);
    page = -1;
    expect(run).toThrowError(IncorrectData);
    page = 1;

    sortBy = '123';
    expect(run).toThrowError(IncorrectData);
    sortBy = 'test';
    expect(run).toThrowError(IncorrectData);
    sortBy = 'price';

    order = null;
    expect(run).toThrowError(IncorrectData);
  })
});
