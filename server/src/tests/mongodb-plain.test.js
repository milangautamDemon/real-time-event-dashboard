const { MongoClient } = require("mongodb");

describe("MongoDB plain JavaScript Jest test", () => {
  jest.setTimeout(30000);

  it("should connect to MongoDB", async () => {
    const client = new MongoClient(
      "mongodb://127.0.0.1:27017/event_dashboard_test",
      {
        serverSelectionTimeoutMS: 15000,
      }
    );

    try {
      const metadata = await client.options.metadata;

      console.log(
        "PLAIN JS JEST METADATA:",
        JSON.stringify(metadata, null, 2)
      );

      await client.connect();

      console.log("PLAIN JS JEST CONNECTED");

      const result = await client
        .db("event_dashboard_test")
        .command({ ping: 1 });

      console.log("PING:", result);

      expect(result.ok).toBe(1);
    } finally {
      await client.close();
    }
  });
});
