const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
const Services = mongoose.model("Services", serviceSchema);
module.exports = Services;
