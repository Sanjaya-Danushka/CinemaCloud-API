const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw new ApiError(400, "User with this email or username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res
    .status(201)
    .json(new ApiResponse(201, { user, token }, "User registered successfully"));
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for email and password
  if (!email || !password) {
    throw new ApiError(400, "Please provide an email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = user.getSignedJwtToken();

  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
};

module.exports = {
  register,
  login,
};
