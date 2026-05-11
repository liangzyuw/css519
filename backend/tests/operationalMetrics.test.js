const request = require("supertest");
const app = require("../src/app");
const { annotations } = require("../src/models/data");

describe("Operational metrics", () => {
  beforeEach(() => {
    annotations.length = 0;
  });

// test 1: Metrics endpoint exposes operational health
// Operators cannot determine whether backend health, annotation count, or latency metrics are available
  test("GET /metrics exposes service health and early alert metrics", async () => {
    const res = await request(app).get("/metrics");

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("service_up");
    expect(res.body).toHaveProperty("frontend_up");
    expect(res.body).toHaveProperty("backend_up");

    expect(res.body).toHaveProperty("api_requests_total");
    expect(res.body).toHaveProperty("api_success_count");
    expect(res.body).toHaveProperty("api_error_count");

    expect(res.body).toHaveProperty("textbook_load_time_ms");
    expect(res.body).toHaveProperty("annotation_load_time_ms");

    expect(res.body).toHaveProperty("annotations_total");
  });

// test 2: Annotation creation changes actual annotation metric
// Dashboard shows stale or incorrect annotation totals
  test("POST /api/annotations updates annotations_total metric", async () => {
    const createRes = await request(app)
      .post("/api/annotations")
      .send({
        content_id: "sec1",
        content_type: "section",
        author_id: "user_2",
        body: "This is a test annotation.",
        visibility: "always",
      });

    expect(createRes.statusCode).toBe(201);

    const metricsRes = await request(app).get("/metrics");

    expect(metricsRes.statusCode).toBe(200);
    expect(metricsRes.body.annotations_total).toBe(1);
  });

  test("POST /metrics/client records annotation load time", async () => {
    const metricRes = await request(app)
      .post("/metrics/client")
      .send({
        name: "annotation_load_time_ms",
        value: 123,
      });

    expect(metricRes.statusCode).toBe(201);

    const metricsRes = await request(app).get("/metrics");

    expect(metricsRes.body.annotation_load_time_ms).toBe(123);
  });
});