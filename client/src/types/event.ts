export interface Event {
  _id?: string;
  id: string;
  user_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface EventsResponse {
  success: boolean;

  data: {
    events: Event[];

    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AnalyticsResponse {
  success: boolean;

  data: {
    period: string;
    totalEvents: number;

    eventTypes: {
      event_type: string;
      count: number;
    }[];
  };
}
