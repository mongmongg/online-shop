const express = require("express");
const router = express.Router();
const {
  getSignup,
  getLogin,
  signup,
  signIn,
  signout,
} = require("../controllers/auth.controller");


router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/signup", signup);
router.post("/login", signIn);
router.post("/logout", signout);

module.exports = router;
