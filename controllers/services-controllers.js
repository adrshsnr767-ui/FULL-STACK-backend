const Services = require("../models/serviceModel");

const services = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const services = await Services.create({ title, desc });
    res.status(201).json({
      message: "Sucessfully Added",
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      maessage: "failed to add services",
      error: error.message,
    });
  }
};

const fetchServices = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const services = await Services.find({ title, desc });
    res.status(201).json({
      message: "Services Sucessfully Fetched",
      data: services,
    });
  } catch (error) {
     res.status(400).json({
      maessage: "failed to Fetch services",
      error: error.message,
    })
  }
};

module.exports = { services,fetchServices };
