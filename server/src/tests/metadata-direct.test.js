const { makeClientMetadata } = require(
  "mongodb/lib/cmap/handshake/client_metadata"
);

describe("MongoDB metadata generation", () => {
  it("should generate driver metadata", () => {
    const metadata = makeClientMetadata({});

    console.log(
      "GENERATED METADATA:",
      JSON.stringify(metadata, null, 2)
    );

    expect(metadata.driver).toBeDefined();
    expect(metadata.driver.name).toBe("nodejs");
    expect(metadata.driver.version).toBeDefined();
    expect(metadata.os).toBeDefined();
  });
});
