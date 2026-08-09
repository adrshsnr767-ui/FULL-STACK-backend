const User = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      message: " Users  Fetched sucessfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      maessage: "failed to Fetch users",
      error: error.message,
    });
  }
};

module.exports={getUser}