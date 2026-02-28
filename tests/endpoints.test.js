const request = require("supertest");
const { startServer, server } = require("../mcp-server");

let app;
let listener;

beforeAll((done) => {
  // start the server on an ephemeral port
  listener = startServer(0); // 0 tells node to pick an available port
  listener.on("listening", () => {
    const address = listener.address();
    app = `http://localhost:${address.port}`;
    done();
  });
});

afterAll((done) => {
  listener.close(done);
});

describe("MCP server endpoints", () => {
  test("health check works without auth", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "healthy");
  });

  test("suppliers list returns data array", async () => {
    const res = await request(app).get("/api/suppliers");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("unknown endpoint returns 404", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", true);
  });
});

describe("API key authentication", () => {
  beforeAll(() => {
    process.env.MCP_API_KEY = "test123";
  });

  afterAll(() => {
    delete process.env.MCP_API_KEY;
  });

  test("fails without key", async () => {
    const res = await request(app).get("/api/suppliers");
    expect(res.status).toBe(401);
  });

  test("fails with wrong key", async () => {
    const res = await request(app)
      .get("/api/suppliers")
      .set("x-api-key", "wrong");
    expect(res.status).toBe(401);
  });

  test("succeeds with correct key", async () => {
    const res = await request(app)
      .get("/api/suppliers")
      .set("x-api-key", "test123");
    expect(res.status).toBe(200);
  });
});
