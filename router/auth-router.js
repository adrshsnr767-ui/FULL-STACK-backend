const express = require("express");
const authControllers = require("../controllers/auth-controllers");
const verifyLoginToken = require("../middleware/verifyLoginToken");
const router = express.Router();

router.route("/").get(authControllers.home);

router.route("/register").post(authControllers.register);

router.route("/login").post(authControllers.login);

router.route("/logout").post(authControllers.logout);

router.route("/me").post(verifyLoginToken, authControllers.me);

module.exports = router;
