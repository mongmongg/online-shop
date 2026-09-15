const Product = require("../models/product.model");
async function getProduct(req, res, next) {
  try {
    const products = await Product.fetchAllProduct();
    res.render("admin/products/products", { products: products });
  } catch (err) {
    next(err);
    return;
  }
}
function getNewProduct(req, res) {
  res.render("admin/products/new-products");
}
async function addNewProduct(req, res, next) {
  const prodData = req.body;
  const newProduct = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await newProduct.saveProduct();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}
function getOrder(req, res) {}
module.exports = { getProduct, getOrder, getNewProduct, addNewProduct };
