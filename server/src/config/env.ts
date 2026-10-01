import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["MONGODB_URI"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 4000),

  mongodbUri: process.env.MONGODB_URI!,

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",

  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),

  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 30),
};
