const conn = require("../infra/db-connection")("infra/loja.db")
const categoriesDAO = require("../model/categoriesDAO")(conn);

exports.getCategories = (req, res) => {
  categoriesDAO.findAll((err, rows) => {
    if (err) {
      return res.json({ message: "Houve um erro ao consultar os dados", err });
    }

    res.render("index", { categories: rows, role: "index" });
  });
};