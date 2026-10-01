import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { Event } from "../models/event.model";

describe("Events API", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_URI_TEST ||
      "mongodb://127.0.0.1:27017/event_dashboard_test";

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await Event.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create an event", async () => {
    const payload = {
      id: "evt-test-1",
      user_id: "user-123",
      event_type: "login",
      payload: { browser: "Chrome" },
      timestamp: new Date().toISOString(),
    };

    const res = await request(app).post("/api/events").send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("evt-test-1");
  });

  it("should reject invalid event", async () => {
    const invalidPayload = {
      user_id: "user-123",
    };

    const res = await request(app).post("/api/events").send(invalidPayload);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("should return paginated events", async () => {
    await Event.create({
      id: "evt-1",
      user_id: "user-1",
      event_type: "login",
      payload: {},
      timestamp: new Date(),
    });

    const res = await request(app).get("/api/events?page=1&limit=10");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.events.length).toBe(1);
  });

  it("should filter by event type", async () => {
    await Event.create([
      {
        id: "evt-1",
        user_id: "u1",
        event_type: "login",
        payload: {},
        timestamp: new Date(),
      },
      {
        id: "evt-2",
        user_id: "u2",
        event_type: "logout",
        payload: {},
        timestamp: new Date(),
      },
    ]);

    const res = await request(app).get("/api/events?event_type=login");

    expect(res.status).toBe(200);
    expect(res.body.data.events.length).toBe(1);
  });

  it("should return analytics", async () => {
    await Event.create([
      {
        id: "evt-1",
        user_id: "u1",
        event_type: "login",
        payload: {},
        timestamp: new Date(),
      },
      {
        id: "evt-2",
        user_id: "u2",
        event_type: "login",
        payload: {},
        timestamp: new Date(),
      },
    ]);

    const res = await request(app).get("/api/events/analytics");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalEvents).toBe(2);
  });
});
