class ProductsDAO {
  constructor (conn) {
    this.db = conn;
  }

  findAll(callback) {
    this.db.all(`SELECT * FROM products`, callback);
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM products WHERE id = ?`, id, callback);
  }

  findbyCategoryId(categoryId, callback) {
    this.db.all(`SELECT * FROM products WHERE categoryId = ?`, categoryId, callback);
  }

  saveProduct(product, callback) {
    const { name, price, image, categoryId } = product;
    this.db.run(
      `INSERT INTO products (name, image, price, categoryId) 
       VALUES (?, ?, ?, ?)`,
      [ name, image, price, categoryId ],
      callback
    );
  }
}

module.exports = (conn) => {
  return new ProductsDAO(conn);
};