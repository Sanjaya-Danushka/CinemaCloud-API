const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    throw new ApiError(500, "Failed to connect to MongoDB", error);
  }
};

module.exports = connectDB;
