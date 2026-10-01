import { useCallback, useEffect, useState } from "react";

import { fetchAnalytics, fetchEvents } from "./services/event.api";

import { EventFilters } from "./components/EventFilters";
import { EventTable } from "./components/EventTable";
import { AnalyticsCard } from "./components/AnalyticsCard";

import type { Event } from "./types/event";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const [eventType, setEventType] = useState("");

  const [search, setSearch] = useState("");

  const [totalEvents, setTotalEvents] = useState(0);

  const [eventTypes, setEventTypes] = useState<
    {
      event_type: string;
      count: number;
    }[]
  >([]);

  const loadData = useCallback(async () => {
    try {
      const [eventsResponse, analyticsResponse] = await Promise.all([
        fetchEvents({
          page: 1,
          limit: 50,
          event_type: eventType || undefined,
          search: search || undefined,
        }),

        fetchAnalytics(),
      ]);

      setEvents(eventsResponse.data.events);

      setTotalEvents(analyticsResponse.data.totalEvents);

      setEventTypes(analyticsResponse.data.eventTypes);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  }, [eventType, search]);

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <main className="dashboard">
      <header className="header">
        <div>
          <h1>Event Monitor</h1>

          <p>Real-time user activity monitoring</p>
        </div>

        <div className="live">
          <span />
          Live
        </div>
      </header>

      <AnalyticsCard totalEvents={totalEvents} eventTypes={eventTypes} />

      <section className="card">
        <div className="section-header">
          <div>
            <h2>Activity Feed</h2>

            <p>Events automatically refresh every 5 seconds.</p>
          </div>
        </div>

        <EventFilters
          eventType={eventType}
          search={search}
          onEventTypeChange={setEventType}
          onSearchChange={setSearch}
        />

        <EventTable events={events} />
      </section>
    </main>
  );
}

export default App;
