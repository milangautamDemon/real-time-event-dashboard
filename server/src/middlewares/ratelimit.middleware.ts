import rateLimit from "express-rate-limit";

import { env } from "../config/env";

export const apiRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,

  limit: env.rateLimitMax,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please try again later.",
    },
  },
});
