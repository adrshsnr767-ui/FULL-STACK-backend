const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  try {
    res.send({
      message: "hello world",
    });
  } catch (error) {
    console.log(error);
  }
};

// user registration
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(201).send({
      message: "Successfully Registered",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: "failed to create User",
      error: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found Please signin ",
      });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).send({
        message: "Password Incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).send({
      message: "login successful",
      data: { id: user?.id },
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: "login Failed",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("Token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).send({
      message: "logout Sucessful",
    });
  } catch (error) {
    res.status(500).send({
      message: "Logout Failed",
      error: error.message,
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        data: "user",
      });
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch user",
      error: error.message,
    });
  }
};

module.exports = { home, register, login, logout, me };
