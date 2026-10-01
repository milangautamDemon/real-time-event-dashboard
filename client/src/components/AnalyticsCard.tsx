interface Props {
  totalEvents: number;

  eventTypes: {
    event_type: string;
    count: number;
  }[];
}

export function AnalyticsCard({ totalEvents, eventTypes }: Props) {
  return (
    <section className="analytics">
      <div className="stat-card">
        <span>Total Events</span>
        <strong>{totalEvents}</strong>
        <small>Last 24 hours</small>
      </div>

      <div className="event-type-stats">
        {eventTypes.map((item) => (
          <div className="type-stat" key={item.event_type}>
            <span>{item.event_type}</span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
