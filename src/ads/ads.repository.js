class AdsRepository {
  constructor(pool, redis) {
    this.redis = redis;
    this.db = pool;
  }
  async findAds(from, to) {
    const sql = `select * from ads offset ${from} limit ${to}`;
    return (await this.db.query(sql)).rows;
  }
  async findSortedAds(from, to, sortBy, order) {
    const columns = 'title, photos_link[1], price'
    const sql = `select ${columns} from ads order by ${sortBy} ${order} limit ${to} offset ${from}`;
    return (await this.db.query(sql)).rows;
  }

  selectSomeCols(columns, data) {
    let result = {};
    for (let key in data) {
      if (columns.includes(key)) result[key] = data[key];
    }
    return result;
  }
  async findAd(id, fields) {
    let needForResponse = ['ad_id', 'title', 'main_photo', 'price', ...fields];
    let ad = await this.redis.hgetall(`ads:${id}`);
    let photos_link = await this.redis.smembers(`photos_list:${id}`);
    ad.photos_link = photos_link;
    ad.main_photo = photos_link[0];
    if (Object.keys(ad).length > 3) return this.selectSomeCols(needForResponse, ad);

    let allFields = `ad_id, title, description, photos_link, photos_link[1] as main_photo, price, date`;
    const sql = `select ${allFields} from ads where ad_id=${id}`;
    let result = (await this.db.query(sql)).rows[0];
    this.redis.sadd(`photos_list:${result.ad_id}`, result['photos_link']);
    this.redis.hmset(`ads:${result.ad_id}`, result);
    return this.selectSomeCols(needForResponse, result);
  }
  async saveAdd(title, description, photos_link, price) {
    const columns = `title, description, photos_link, price`;
    const values = `'${title}', '${description}', '{"${photos_link.join('","')}"}', ${price}`;
    const sql = `insert into ads(${columns}) values(${values}) returning ad_id`;
    return (await this.db.query(sql));
  }
}
module.exports.AdsRepository = AdsRepository;