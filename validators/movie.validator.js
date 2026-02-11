const Joi = require("joi");
const ApiError = require("../utils/ApiError");

const movieSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  genre: Joi.string().trim().min(1).required(),
  year: Joi.number()
    .integer()
    .min(1888)
    .max(new Date().getFullYear() + 5)
    .required(),
  rating: Joi.number().min(0).max(10).required(),
});

const validateMovie = (req, res, next) => {
  const { error } = movieSchema.validate(req.body);
  if (error) {
    // Extract the error message and throw an ApiError
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new ApiError(400, errorMessage);
  }
  next();
};

module.exports = {
  validateMovie,
};
