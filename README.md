# Movie API

This is a production-ready Express.js API for managing movies, featuring authentication, authorization, robust error handling, logging, and security best practices.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Testing](#testing)
- [Logging](#logging)
- [Security](#security)
- [Graceful Shutdown](#graceful-shutdown)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

-   **RESTful API**: Standardized endpoints for CRUD operations on movies.
-   **MongoDB with Mongoose**: Robust and scalable database solution.
-   **JWT Authentication**: Secure user registration and login with JSON Web Tokens.
-   **Role-Based Access Control**: Differentiate user permissions (e.g., `user`, `admin`).
-   **Input Validation**: Ensures data integrity using `Joi`.
-   **Centralized Error Handling**: Custom error classes and middleware for consistent error responses.
-   **Structured Logging**: Integration of `Morgan` for HTTP request logging and `Winston` for application logging.
-   **API Versioning**: Clear and organized API endpoint structure (`/api/v1`).
-   **Security Middlewares**: `Helmet`, `express-rate-limit`, `express-xss-sanitizer`, `hpp` for enhanced security.
-   **API Documentation**: Interactive Swagger UI for easy exploration of endpoints.
-   **Graceful Shutdown**: Ensures clean termination of the server and database connections.
-   **Unit & Integration Testing**: Basic setup with `Jest` and `Supertest`.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/movie-api.git
    cd movie-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
# MongoDB Connection URI
MONGODB_URI=your_mongodb_connection_string

# Server Port
PORT=3000

# JWT Secret and Expiration
JWT_SECRET=YOUR_VERY_SECRET_KEY_HERE
JWT_EXPIRE=30d
```

You can use the `.env-example` file as a template.

### Running the Application

To start the development server with Nodemon (auto-restarts on file changes):

```bash
npm run dev
```

The API will be running at `http://localhost:3000`.

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication

-   `POST /api/v1/auth/register` - Register a new user
-   `POST /api/v1/auth/login` - Log in a user

### Movies

-   `GET /api/v1/movies` - Get all movies (paginated)
-   `GET /api/v1/movies/find?q=<query>` - Find movies by title or ID
-   `GET /api/v1/movies/:id` - Get a single movie by ID
-   `POST /api/v1/movies` - Create a new movie (Admin only)
-   `PUT /api/v1/movies/:id` - Update a movie by ID (Admin only)
-   `DELETE /api/v1/movies/:id` - Delete a movie by ID (Admin only)

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.

1.  **Register** or **Login** to obtain a JWT token.
2.  Include the token in the `Authorization` header of your requests in the format: `Bearer <YOUR_JWT_TOKEN>`.

### Roles

-   `user`: Can view movies.
-   `admin`: Can view, create, update, and delete movies.

## API Documentation (Swagger)

Interactive API documentation is available via Swagger UI.

Access it at: `http://localhost:3000/api-docs`

## Testing

Basic testing is set up using `Jest` and `Supertest`.

To run tests:

```bash
npm test
```

## Logging

-   HTTP request logs are handled by `Morgan` and streamed to `Winston`.
-   Application logs (errors, info) are handled by `Winston` and stored in `logs/error.log` and `logs/combined.log`.
-   Console logging is active in non-production environments.

## Security

The API employs several security middlewares:

-   `Helmet`: Sets various HTTP headers for security.
-   `express-rate-limit`: Prevents brute-force attacks by limiting requests per IP.
-   `express-xss-sanitizer`: Sanitizes user input to prevent Cross-Site Scripting (XSS) attacks.
-   `hpp`: Protects against HTTP Parameter Pollution attacks.

## Graceful Shutdown

The server is configured to shut down gracefully upon receiving `SIGTERM` or `SIGINT` signals, ensuring proper cleanup of resources and database connections.

## Folder Structure

```
backend/
├── config/                  # Database connection, logger, Swagger configuration
│   ├── db.js
│   ├── logger.js
│   └── swagger.js
├── controllers/             # Business logic for routes
│   ├── auth.controller.js
│   └── movie.controller.js
├── middlewares/             # Custom Express middlewares (auth, error handling)
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/                  # Mongoose schemas and models
│   ├── movie.model.js
│   └── user.model.js
├── routers/                 # API routes definitions
│   ├── auth.routes.js
│   └── movie.routes.js
├── services/                # Business logic (can be expanded for complex operations)
├── utils/                   # Utility functions (ApiError, ApiResponse)
│   ├── ApiError.js
│   └── ApiResponse.js
├── validators/              # Joi validation schemas
│   └── movie.validator.js
├── logs/                    # Application log files
├── tests/                   # Jest and Supertest for unit/integration tests
│   └── app.test.js
├── .env                     # Environment variables
├── .env-example             # Environment variables example
├── app.js                   # Main application file
├── jest.config.js           # Jest test runner configuration
├── jest.setup.js            # Jest test environment setup
├── package.json             # Project dependencies and scripts
└── package-lock.json        # Locked dependencies
```

## Contributing

Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
# CinemaCloud-API
