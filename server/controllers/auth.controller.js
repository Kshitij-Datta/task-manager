const userModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const genToken = require("../utils/generateToken");

// registeration
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  genToken(res, user._id);

  res.status(201).json({
    message: "User registered successfully!",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  genToken(res, userExists._id);

  res.status(201).json({
    message: "User login successful",
    user: {
      id: userExists._id,
      email: userExists.email,
      password: userExists.password,
    },
  });
};

// logout
const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully!" });
};

// getMe
const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

module.exports = { register, login, logout, getMe };
