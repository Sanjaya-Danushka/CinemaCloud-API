const request = require("supertest");
// Assuming your app export is in app.js and can be imported for testing
// You might need to adjust this path based on how your app is exported
const app = require("../app"); // Adjust path if necessary

describe("Movie API", () => {
  it("should return a welcome message on the root route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("🎬 Movie API is running");
  });

  // Add more tests for other routes (e.g., getAllMovies, createMovie)
  // after setting up authentication and a test database.
});
