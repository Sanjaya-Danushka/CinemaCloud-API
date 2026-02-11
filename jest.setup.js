// jest.setup.js
// This file can be used to set up global test environment configurations.

// Example: Set environment variables for testing
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test_jwt_secret";
process.env.JWT_EXPIRE = "1h";
process.env.MONGODB_URI = "mongodb://localhost:27017/testdb";

// You might also want to connect/disconnect to a test database here
// const mongoose = require("mongoose");
// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// });
// afterAll(async () => {
//   await mongoose.connection.close();
// });
