const productsController = require("./controller/products.controller");

module.exports = (app) => {
  app.get("/products", (req, res) => productsController.getProducts(req, res));
  app.get("/products/:id", (req, res) => productsController.getProductById(req, res));
}