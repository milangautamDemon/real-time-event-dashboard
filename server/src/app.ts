import express from "express";
import cors from "cors";
import helmet from "helmet";

import eventRoutes from "./routes/event.route";
import { apiRateLimiter } from "./middlewares/ratelimit.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.corsOrigin || "*",
  }),
);

app.use(express.json());

app.use(apiRateLimiter);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

app.use("/api", eventRoutes);

app.use(errorMiddleware);

export default app;
