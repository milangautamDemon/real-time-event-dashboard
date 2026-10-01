import mongoose from "mongoose";

describe("MongoDB connection", () => {
  jest.setTimeout(30000);

  it("should connect to MongoDB", async () => {
    console.log("Starting MongoDB connection...");

    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/event_dashboard_test", {
        serverSelectionTimeoutMS: 15000,
      });

      console.log("JEST MONGOOSE CONNECTED");
      console.log("Ready state:", mongoose.connection.readyState);

      expect(mongoose.connection.readyState).toBe(1);
    } finally {
      await mongoose.disconnect();
    }
  });
});
