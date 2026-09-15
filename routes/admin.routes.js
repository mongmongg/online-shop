const express = require("express");
const router = express.Router();
const {
  getProduct,
  getOrder,
  getNewProduct,
  addNewProduct,
} = require("../controllers/admin.controller");
const configureMulterMiddleware  = require("../middleware/image-upload");

router.get("/products", getProduct);
router.get("/products/new", getNewProduct);
router.post("/products", configureMulterMiddleware, addNewProduct);
router.get("/order", getOrder);

module.exports = router;
