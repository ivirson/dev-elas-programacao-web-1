const conn = require("../infra/db-connection")("infra/loja.db")
const productsDAO = require("../model/productsDAO")(conn);

exports.getProducts = (req, res) => {
  productsDAO.findAll((err, rows) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { products: rows, role: "products" });
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  productsDAO.findById(id, (err, row) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { product: row, role: "detail" });
  })
}

exports.getProductByCategoryId = (req, res) => {
  const categoryId = req.params.id;
  productsDAO.findbyCategoryId(categoryId, (err, rows) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { products: rows, role: "products" });
  })
}