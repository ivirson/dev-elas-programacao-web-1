class CategoriesDAO {
  constructor (conn) {
    this.db = conn;
  }

  findAll(callback) {
    this.db.all(`SELECT * FROM categories`, callback);
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM categories WHERE id = ?`, id, callback);
  }
}

module.exports = (conn) => {
  return new CategoriesDAO(conn);
};