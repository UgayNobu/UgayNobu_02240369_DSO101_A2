// backend/app.test.js

import request from "supertest";
import { app } from "./server";

describe("Todo API Tests", () => {
  test("GET / should return 200 and a welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    // Check for a welcome message or similar property in the response
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});
