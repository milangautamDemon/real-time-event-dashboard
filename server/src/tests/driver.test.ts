import mongoose from "mongoose";
import { MongoClient } from "mongodb";

describe("MongoDB driver versions", () => {
  it("should show versions", () => {
    console.log("Mongoose:", mongoose.version);
    console.log("MongoDB driver:", MongoClient.name);
    console.log("MongoDB package:", require("mongodb/package.json").version);

    expect(mongoose.version).toBeDefined();
  });
});
