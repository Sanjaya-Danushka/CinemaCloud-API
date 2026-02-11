const Movie = require("../models/movie.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// GET /movies
const getAllMovies = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const movies = await Movie.find().skip(skip).limit(limit);
  const totalMovies = await Movie.countDocuments();
  const totalPages = Math.ceil(totalMovies / limit);

  res.status(200).json(
    new ApiResponse(200, {
      movies,
      currentPage: page,
      totalPages,
      totalMovies,
    }),
  );
};

// GET /movies/:id
const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }
  res.status(200).json(new ApiResponse(200, movie));
};

const findMovie = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    throw new ApiError(400, "Query parameter 'q' is required");
  }

  let movie;
  // If it's a valid MongoDB ObjectId, try searching by ID
  if (q.match(/^[0-9a-fA-F]{24}$/)) {
    movie = await Movie.findById(q);
  }

  if (movie) {
    return res.status(200).json(new ApiResponse(200, movie));
  }

  // Otherwise, search by title
  const results = await Movie.find({
    title: { $regex: q, $options: "i" },
  }); // Case-insensitive search

  if (results.length === 0) {
    throw new ApiError(404, "No movies found matching your query");
  }

  res.status(200).json(new ApiResponse(200, results));
};

// POST /movies
const createMovie = async (req, res) => {
  const newMovie = await Movie.create(req.body);
  res.status(201).json(new ApiResponse(201, newMovie, "Movie created successfully"));
};

// PUT /movies/:id
const updateMovie = async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedMovie) {
    throw new ApiError(404, "Movie not found");
  }

  res.status(200).json(new ApiResponse(200, updatedMovie, "Movie updated successfully"));
};

// DELETE /movies/:id
const deleteMovie = async (req, res) => {
  const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

  if (!deletedMovie) {
    throw new ApiError(404, "Movie not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Movie deleted successfully"));
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  findMovie,
};
