import { Request, Response, NextFunction } from "express";

import {
  createEvent,
  getAnalytics,
  getEvents,
} from "../services/event.service";

import {
  createEventSchema,
  eventQuerySchema,
} from "../validators/event.validator";

export async function createEventController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createEventSchema.parse(req.body);

    const event = await createEvent(data);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
}

export async function getEventsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = eventQuerySchema.parse(req.query);

    const result = await getEvents(query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAnalyticsController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const analytics = await getAnalytics();

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
}
