const productsController = require("./controller/products.controller");
const categoriesController = require("./controller/categories.controller");

module.exports = (app) => {
  app.get("/", (req, res) => categoriesController.getCategories(req, res));

  app.get("/products", (req, res) => productsController.getProducts(req, res));
  app.get("/products/:id", (req, res) => productsController.getProductById(req, res));
}