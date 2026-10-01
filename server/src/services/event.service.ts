import { Event } from "../models/event.model";

interface CreateEventInput {
  id: string;
  user_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}

interface EventQuery {
  page: number;
  limit: number;
  event_type?: string;
  date_from?: Date;
  date_to?: Date;
  search?: string;
}

export async function createEvent(data: CreateEventInput) {
  return Event.create(data);
}

export async function getEvents(query: EventQuery) {
  const { page, limit, event_type, date_from, date_to, search } = query;

  const filter: Record<string, unknown> = {};

  if (event_type) {
    filter.event_type = event_type;
  }

  if (date_from || date_to) {
    filter.timestamp = {};

    if (date_from) {
      (filter.timestamp as Record<string, Date>).$gte = date_from;
    }

    if (date_to) {
      (filter.timestamp as Record<string, Date>).$lte = date_to;
    }
  }

  if (search) {
    filter.$or = [
      {
        user_id: {
          $regex: search,
          $options: "i",
        },
      },
      {
        event_type: {
          $regex: search,
          $options: "i",
        },
      },
      {
        payload: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit).lean(),

    Event.countDocuments(filter),
  ]);

  return {
    events,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAnalytics() {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const result = await Event.aggregate([
    {
      $match: {
        timestamp: {
          $gte: last24Hours,
        },
      },
    },

    {
      $group: {
        _id: "$event_type",
        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        count: -1,
      },
    },
  ]);

  const totalEvents = result.reduce((sum, item) => sum + item.count, 0);

  return {
    period: "last_24_hours",
    totalEvents,
    eventTypes: result.map((item) => ({
      event_type: item._id,
      count: item.count,
    })),
  };
}
