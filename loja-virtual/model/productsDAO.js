class ProductsDAO {
  constructor(conn) {
    this.db = conn;
  }

  findAll(callback) {
    this.db.all(`SELECT * FROM products`, callback);
  }

  findById(id, callback) {
    this.db.get(`SELECT * FROM products WHERE id = ?`, id, callback);
  }

  findbyCategoryId(categoryId, callback) {
    this.db.all(
      `SELECT * FROM products WHERE categoryId = ?`,
      categoryId,
      callback
    );
  }

  saveProduct(product, callback) {
    const { name, price, image, categoryId } = product;
    this.db.run(
      `INSERT INTO products (name, image, price, categoryId) 
       VALUES (?, ?, ?, ?)`,
      [name, image, price, categoryId],
      callback
    );
  }

  updateProduct(id, product, callback) {
    const { name, price, image, categoryId } = product;
    const sql = `UPDATE products SET name = ?, price = ?, image = ?, categoryId = ? WHERE id = ?`;

    this.db.run(sql, [name, price, image, categoryId, id], callback);
  }

  deleteProduct(id, callback) {
    const sql = `DELETE FROM products WHERE id = ?`;

    this.db.run(sql, id, callback);
  }
}

module.exports = (conn) => {
  return new ProductsDAO(conn);
};
