const conn = require("../infra/db-connection")("infra/loja.db");
const productsDAO = require("../model/productsDAO")(conn);
const categoryDAO = require("../model/categoriesDAO")(conn);
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

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
  });
};

exports.getProductByCategoryId = (req, res) => {
  const categoryId = req.params.id;
  productsDAO.findbyCategoryId(categoryId, (err, rows) => {
    if (err) {
      return res.render("not-found", {
        errorMessage: "Houve um erro ao consultar os dados",
        err,
      });
    }

    if (!rows.length) {
      return res.render("not-found", {
        errorMessage: "Produto não encontrado",
      });
    }

    res.render("index", { products: rows, role: "products" });
  });
};

exports.getAddProductsForm = (req, res) => {
  categoryDAO.findAll((err, rows) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Erro ao consultar os dados.",
        err: err,
      });
    }

    res.render("add-product", { categories: rows });
  });
};

exports.saveProduct = (req, res) => {
  const formData = new formidable.IncomingForm();

  formData.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Algo errado aconteceu.",
        err: err,
      });
    }

    const imagesPath = path.join(
      __dirname,
      "../public/images",
      files.image.newFilename
    );

    const product = { ...fields, image: files.image.newFilename };

    productsDAO.saveProduct(product, (err) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao salvar os dados.",
          err: err,
        });
      }

      // Salva a imagem no caminho definido, apenas após obter suceso ao salvar no banco
      fs.renameSync(files.image.filepath, imagesPath);

      return res.redirect("/products");
    });
  });
};

exports.getEditProductsForm = (req, res) => {
  const id = req.params.id;

  productsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }

    if (!row) {
      return res.status(404).json({
        errorMessage: "Produto não encontrado.",
        err: err,
      });
    }

    categoryDAO.findAll((err, rows) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao consultar os dados.",
          err: err,
        });
      }

      res.render("edit-product", { product: row, categories: rows });
    });
  });
};

exports.editProduct = (req, res) => {
  const id = req.params.id;
  // const formData = new formidable.IncomingForm();

  productsDAO.findById(id, (err, row) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Houve um erro ao consultar os dados.",
        err: err,
      });
    }

    console.log(row);

    if (!row) {
      return res.status(404).json({
        errorMessage: "Produto não encontrado.",
        err: err,
      });
    }

    // formData.parse(req, (err, fields, files) => {
    //   if (err) {
    //     return res.status(500).json({
    //       errorMessage: "Algo errado aconteceu.",
    //       err: err,
    //     });
    //   }

    // const imagesPath = path.join(__dirname, "../public/images", files.image.newFilename);

    // const product = { ...row, ...fields, image: files.image.newFilename };

    const product = { ...row, ...req.body };

    console.log(req.body);

    productsDAO.updateProduct(id, product, (err2) => {
      if (err2) {
        return res.status(500).json({
          errorMessage: "Algo errado aconteceu.",
          err: err2,
        });
      }

      // Salva a imagem no caminho definido, apenas após obter suceso ao salvar no banco
      // fs.renameSync(files.image.filepath, imagesPath);

      return res.redirect("/products");
    });
    // });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  productsDAO.deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({
        errorMessage: "Algo errado aconteceu.",
        err: err,
      });
    }

    return res.redirect("/products");
  });
};
