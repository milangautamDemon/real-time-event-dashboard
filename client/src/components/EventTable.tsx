import type { Event } from "../types/event";

interface Props {
  events: Event[];
}

export function EventTable({ events }: Props) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>User</th>
            <th>Type</th>
            <th>Payload</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>

              <td>{event.user_id}</td>

              <td>
                <span className="badge">{event.event_type}</span>
              </td>

              <td>
                <code>{JSON.stringify(event.payload)}</code>
              </td>

              <td>{new Date(event.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
