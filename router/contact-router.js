const express = require("express");
const contactControllers = require("../controllers/contact-controller");
const contactRouter = express.Router();

contactRouter.route("/contact").post(contactControllers.contact);

module.exports = contactRouter;
