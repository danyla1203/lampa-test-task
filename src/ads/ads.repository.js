class AdsRepository {
  constructor(pool) {
    this.db = pool
  }
}
module.exports.AdsRepository = AdsRepository;