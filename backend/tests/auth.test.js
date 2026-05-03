const request = require("supertest");
const app = require("../src/app");

describe("Authentication API", () => {
  test("rejects invalid login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "fake@example.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
  });

  test("logs in instructor with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "teacher@example.com",
        password: "teach123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe("instructor");
  });
});