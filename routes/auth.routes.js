const express = require("express");
const {
  getSignup,
  getLogin,
  signup,
  signIn,
  signout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/signup", getSignup);
router.get("/login", getLogin);
router.post("/signup", signup);
router.post("/login", signIn);
router.post("/logout", signout);

module.exports = router;
