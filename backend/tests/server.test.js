const request = require("supertest");
const app = require("../server");

describe("StadiumOS Backend API", () => {
  test("GET / should return success message", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("StadiumOS Backend Running");
  });

  test("POST /api/login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        username: "admin",
        password: "stadium123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("POST /api/login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        username: "wrong",
        password: "wrong",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("GET /api/dashboard", async () => {
    const res = await request(app).get("/api/dashboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("visitors");
  });

  test("GET /api/weather", async () => {
    const res = await request(app).get("/api/weather");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("temperature");
  });

  test("GET /api/parking", async () => {
    const res = await request(app).get("/api/parking");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("zoneA");
  });

  test("POST /api/chat", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({
        message: "weather",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toContain("28");
  });
});