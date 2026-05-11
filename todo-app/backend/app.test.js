// backend/app.test.js

const request = require("supertest");
const { app } = require("./server");

describe("Todo API Tests", () => {
  test("GET /health should return 200 and a message", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});
