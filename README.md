# Real-Time Event Dashboard

A real-time user activity monitoring dashboard built with:

- Node.js
- TypeScript
- Express
- MongoDB
- React
- Vite
- Docker

## Features

- Event ingestion
- Event validation
- Activity feed
- Polling every 5 seconds
- Event type filtering
- Payload search
- Pagination
- 24-hour analytics
- Rate limiting
- Structured error handling
- API tests
- Docker support

## Architecture

React Dashboard
|
v
Node.js / Express API
|
v
MongoDB

## API

### POST /api/events

Creates a new event.

### GET /api/events

Returns paginated events.

Supported query parameters:

- page
- limit
- event_type
- date_from
- date_to
- search

### GET /api/events/analytics

Returns event statistics for the last 24 hours.

## Environment Variables

Copy:

cp .env.example .env

## Running locally

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

## Docker

docker compose up --build

## Testing

npm test
