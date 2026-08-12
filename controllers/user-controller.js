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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    const loggedInUserId = req.user_id;
    if (id === loggedInUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot delete your own account" });
    }

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      maessage: "failed to delete users",
      error: error.message,
    });
  }
};

//delete user

module.exports = { getUser, deleteUser };
