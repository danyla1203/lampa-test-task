class AdsRepository {
  constructor(pool) {
    this.db = pool;
  }
  async findAds(from, to) {
    let sql = `select * from ads offset ${from} limit ${to}`;
    return (await this.db.query(sql)).rows;
  }
  async findSortedAds(from, to, sortBy, order) {
    let columns = 'title, photos_link[1], price'
    let sql = `select ${columns} from ads order by ${sortBy} ${order} limit ${to} offset ${from}`;
    return (await this.db.query(sql)).rows;
  }
}
module.exports.AdsRepository = AdsRepository;