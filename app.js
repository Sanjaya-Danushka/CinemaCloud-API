// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// =======================
// MongoDB Connection
// =======================
(async () => {
  try {
    await connectDB();
    console.log("🎬 Movie API is running"); // Log success after DB connection
  } catch (error) {
    console.error("❌ API startup failed due to DB connection error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
})();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());

// Security Middleware
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");

app.use(helmet());
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Custom middleware
const morgan = require("morgan");
const logger = require("./config/logger");
const errorHandler = require("./middlewares/error.middleware"); // Import the error handler

// Morgan for HTTP request logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// =======================
// Routes
// =======================
const movieRoutes = require("./routers/movie.routes");
const authRoutes = require("./routers/auth.routes");

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/auth", authRoutes);

// Swagger Docs
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Root route
app.get("/", (req, res) => {
  res.send("🎬 Movie API is running");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler (ALWAYS LAST)
app.use(errorHandler);

// =======================
// Server
// =======================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle SIGTERM and SIGINT for graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log(" MongoDB connection closed.");
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT received. Shutting down gracefully.");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log(" MongoDB connection closed.");
      process.exit(0);
    });
  });
});
