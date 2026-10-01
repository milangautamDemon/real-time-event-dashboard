interface Props {
  eventType: string;
  search: string;
  onEventTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export function EventFilters({
  eventType,
  search,
  onEventTypeChange,
  onSearchChange,
}: Props) {
  return (
    <div className="filters">
      <select
        value={eventType}
        onChange={(e) => onEventTypeChange(e.target.value)}
      >
        <option value="">All Events</option>
        <option value="login">Login</option>
        <option value="logout">Logout</option>
        <option value="purchase">Purchase</option>
        <option value="page_view">Page View</option>
        <option value="signup">Signup</option>
      </select>

      <input
        type="search"
        placeholder="Search payload..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
