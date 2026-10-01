import axios from "axios";

import type { AnalyticsResponse, EventsResponse } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
});

export async function fetchEvents(params: {
  page?: number;
  limit?: number;
  event_type?: string;
  search?: string;
}) {
  const response = await api.get<EventsResponse>("/events", {
    params,
  });

  return response.data;
}

export async function fetchAnalytics() {
  const response = await api.get<AnalyticsResponse>("/events/analytics");

  return response.data;
}
