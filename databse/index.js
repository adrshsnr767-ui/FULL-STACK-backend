const mongoose = require("mongoose");
const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URl);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;    