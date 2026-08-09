const express = require("express");
const serviceControllers  = require("../controllers/services-controllers");

const serviceRouter = express.Router();

serviceRouter.route("/services").post(serviceControllers.services);

serviceRouter.route("/get/services").get(serviceControllers.fetchServices);

module.exports = serviceRouter;
