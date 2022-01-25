class AdsRepository {
  constructor(pool) {
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
  async findAd(id, fields) {
    let columns = `title, photos_link[1] as main_photo, price`;
    if (fields.length > 0) {
      columns = `${columns}, ${fields}`;
    }
    const sql = `select ${columns} from ads where ad_id=${id}`;
    return (await this.db.query(sql)).rows;
  }
  async saveAdd(title, description, photos_link, price) {
    const columns = `title, description, photos_link, price`;
    const values = `'${title}', '${description}', '{"${photos_link.join('","')}"}', ${price}`;
    const sql = `insert into ads(${columns}) values(${values}) returning ad_id`;
    return (await this.db.query(sql));
  }
}
module.exports.AdsRepository = AdsRepository;