import { Router } from "express";

import {
  createEventController,
  getAnalyticsController,
  getEventsController,
} from "../controllers/event.controller";

const router = Router();

router.post("/events", createEventController);

router.get("/events", getEventsController);

router.get("/events/analytics", getAnalyticsController);

export default router;
