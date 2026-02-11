const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1888, // First movie ever made
      max: new Date().getFullYear() + 5, // Allow for future releases
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
