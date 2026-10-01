import mongoose from "mongoose";

import app from "./app";
import { env } from "./config/env";

async function startServer() {
  try {
    await mongoose.connect(env.mongodbUri);

    console.log("MongoDB connected");

    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);

    process.exit(1);
  }
}

startServer();
