const express = require("express");

const userControllers = require("../controllers/user-controller");
const userRouter = express.Router();

userRouter.route("/user").get(userControllers.getUser);

userRouter.route("/user/delete/:id").delete(userControllers.deleteUser);

module.exports = userRouter;
