import mongoose from "mongoose";

describe("Mongoose MongoDB driver", () => {
  it("should show the driver used by Mongoose", () => {
    console.log("Mongoose version:", mongoose.version);

    try {
      const driver = require("mongoose/node_modules/mongodb");
      console.log("Mongoose internal MongoDB driver:", driver.version);
      console.log(
        "Mongoose internal driver path:",
        require.resolve("mongoose/node_modules/mongodb")
      );
    } catch (error) {
      console.log("Could not resolve nested MongoDB driver:", error);
    }

    console.log(
      "Top-level MongoDB path:",
      require.resolve("mongodb")
    );
    console.log(
      "Top-level MongoDB version:",
      require("mongodb/package.json").version
    );

    expect(mongoose.version).toBeDefined();
  });
});
