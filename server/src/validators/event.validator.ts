import { z } from "zod";

export const createEventSchema = z.object({
  id: z.string().min(1),

  user_id: z.string().min(1),

  event_type: z.string().min(1),

  payload: z.record(z.string(), z.unknown()),

  timestamp: z.coerce.date(),
});

export const eventQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(20),

  event_type: z.string().optional(),

  date_from: z.coerce.date().optional(),

  date_to: z.coerce.date().optional(),

  search: z.string().optional(),
});
