import { MongoClient } from "mongodb";

describe("MongoDB metadata", () => {
  it("should inspect generated client metadata", async () => {
    const client = new MongoClient(
      "mongodb://127.0.0.1:27017/event_dashboard_test"
    );

    try {
      const metadata = await (client as any).options.metadata;

      console.log(
        "JEST CLIENT METADATA:",
        JSON.stringify(metadata, null, 2)
      );

      console.log(
        "JEST DRIVER INFO:",
        JSON.stringify((client as any).options.driverInfo, null, 2)
      );

      expect(metadata).toBeDefined();
    } finally {
      await client.close();
    }
  });
});
