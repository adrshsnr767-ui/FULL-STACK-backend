const Contact = require("../models/contactModel");

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contMessage = await Contact.create({ name, email, message });
    res.status(201).json({
      message: "form sent sucessfully",
      data: contMessage,
    });
  } catch (error) {
    res.status(400).send({
      message: "failed to send message",
      error: error.message,
    });
  }
};

module.exports = {contact};
