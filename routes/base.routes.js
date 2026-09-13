const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/shop.controller");

router.get("/", getHome);

module.exports = router;
