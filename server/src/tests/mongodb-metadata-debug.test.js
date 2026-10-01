const mongodb = require("mongodb");

describe("MongoDB metadata debug", () => {
  it("should reveal metadata generation error", async () => {
    const client = new mongodb.MongoClient(
      "mongodb://127.0.0.1:27017/event_dashboard_test"
    );

    try {
      console.log("MongoDB version:", require("mongodb/package.json").version);

      console.log(
        "MongoDB client options runtime:",
        client.options.runtime
      );

      const metadataModule = require(
        "mongodb/lib/cmap/handshake/client_metadata.js"
      );

      console.log(
        "makeClientMetadata:",
        typeof metadataModule.makeClientMetadata
      );

      try {
        const metadata = await metadataModule.makeClientMetadata(
          [],
          client.options
        );

        console.log(
          "DIRECT GENERATED METADATA:",
          JSON.stringify(metadata, null, 2)
        );
      } catch (error) {
        console.error("🔥 METADATA GENERATION ERROR:");
        console.error(error);
        console.error("Stack:");
        console.error(error?.stack);

        throw error;
      }
    } finally {
      await client.close();
    }
  });
});
