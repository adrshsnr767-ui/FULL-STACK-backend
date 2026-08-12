const express = require("express");

const userControllers = require("../controllers/user-controller");
const verifyLoginToken = require("../middleware/verifyLoginToken");
const userRouter = express.Router();

userRouter.route("/user").get(userControllers.getUser);

userRouter.route("/user/delete/:id").delete(verifyLoginToken ,userControllers.deleteUser);

module.exports = userRouter;
