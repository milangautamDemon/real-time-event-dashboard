import { MongoClient } from "mongodb";

describe("MongoDB native driver", () => {
  jest.setTimeout(30000);

  it("should connect using MongoClient", async () => {
    const client = new MongoClient(
      "mongodb://127.0.0.1:27017/event_dashboard_test",
      {
        serverSelectionTimeoutMS: 15000,
      }
    );

    try {
      console.log("Starting native MongoDB driver connection...");

      await client.connect();

      console.log("NATIVE MONGODB CONNECTED");

      const result = await client
        .db("event_dashboard_test")
        .command({ ping: 1 });

      console.log("PING RESULT:", result);

      expect(result.ok).toBe(1);
    } finally {
      await client.close();
    }
  });
});
