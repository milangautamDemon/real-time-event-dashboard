# Real-Time Event Dashboard

A real-time user activity monitoring dashboard built with **Node.js, TypeScript, Express, MongoDB, React, and Vite**.

The application allows events to be ingested through a REST API and monitored through a web dashboard with filtering, pagination, analytics, rate limiting, and automated API tests.

## Tech Stack

### Backend

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- Zod
- Express Rate Limit
- Jest
- Supertest

### Frontend

- React.js
- Vite

### DevOps

- Docker
- Docker Compose

## Features

- Event ingestion
- Event validation
- Real-time activity monitoring
- Automatic event polling
- Event type filtering
- Payload search
- Date range filtering
- Pagination
- 24-hour event analytics
- Rate limiting
- Structured error handling
- MongoDB persistence
- REST API
- Automated API tests
- Docker support

## Architecture

```text
┌──────────────────────┐
│   React Dashboard    │
│       + Vite         │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│  Node.js + Express   │
│      TypeScript      │
└──────────┬───────────┘
           │
           │ Mongoose
           ▼
┌──────────────────────┐
│       MongoDB        │
└──────────────────────┘
```

## Project Structure

```text
real-time-event-dashboard/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```


## API

### POST `/api/events`

Creates a new event.

Example request:

```json
{
  "id": "evt-001",
  "user_id": "user-123",
  "event_type": "login",
  "payload": {
    "browser": "Chrome",
    "device": "Desktop"
  },
  "timestamp": "2026-10-03T10:30:00.000Z"
}
```

### GET `/api/events`

Returns a paginated list of events.

Supported query parameters:

| Parameter    | Description                  |
| ------------ | ---------------------------- |
| `page`       | Page number                  |
| `limit`      | Number of events per page    |
| `event_type` | Filter by event type         |
| `date_from`  | Start date/time              |
| `date_to`    | End date/time                |
| `search`     | Search event payload/content |

Example:

```text
GET /api/events?page=1&limit=10&event_type=login
```

### GET `/api/events/analytics`

Returns event statistics for the last 24 hours.

Example:

```text
GET /api/events/analytics
```

## Environment Variables

Create an environment file:

```bash
cp .env.example .env
```

Example:

```env
MONGODB_URI=mongodb://localhost:27017/event_dashboard
```

For testing, the application can use a separate MongoDB test database when `MONGODB_URI_TEST` is configured.

## Running Locally

### 1. Start MongoDB

Make sure MongoDB is running locally or start it using Docker.

### 2. Backend

```bash
cd server
npm install
npm run dev
```

The backend will start using the configured environment variables.

### 3. Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Then open the URL displayed by Vite in your browser.

## Docker

The project supports Docker Compose.

Start the application with:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
```

## Testing

Run the backend test suite from the `server` directory:

```bash
npm test
```

The test suite covers:

- Event creation
- Event validation
- Event pagination
- Event type filtering
- Event analytics

Current test status:

```text
Test Suites: 1 passed
Tests:       5 passed
```

## Error Handling

The API uses structured error responses for validation and application errors.

Example:

```json
{
  "success": false,
  "message": "Invalid event data"
}
```

## Rate Limiting

API endpoints are protected with rate limiting to help prevent excessive requests and abuse.

## License

This project is licensed under the **MIT License**.
