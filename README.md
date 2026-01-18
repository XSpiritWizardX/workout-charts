# Workout SaaS

A minimal SaaS-style workout manager. It supports organizations, workouts, and exercises.

## Features
- Create organizations (tenants)
- Log workouts per organization
- Track exercises per workout

## Quick start
```bash
npm install
npm start
```
Then open http://localhost:3000

## Deploy on Render
This repo includes a `render.yaml` blueprint with a persistent disk for SQLite.

Option A: Blueprint
1) Push this repo to GitHub.
2) In Render, choose "New" -> "Blueprint" and select the repo.
3) Render provisions the web service and disk automatically.

Option B: Manual
1) Create a new Web Service from the repo.
2) Build command: `npm install`
3) Start command: `node server.js`
4) Add a disk with mount path `/var/data` and set `DATABASE_PATH=/var/data/data.sqlite`.

## API
- `GET /api/orgs`
- `POST /api/orgs` `{ "name": "Team Alpha" }`
- `GET /api/orgs/:orgId/workouts`
- `POST /api/orgs/:orgId/workouts` `{ "title": "Leg Day", "performed_on": "2025-01-01", "notes": "Felt strong" }`
- `GET /api/workouts/:workoutId/exercises`
- `POST /api/workouts/:workoutId/exercises` `{ "name": "Squat", "sets": 5, "reps": 5, "weight": 225 }`

## Notes
This is a lightweight starter. Add auth, billing, and role-based access to turn it into a full SaaS.
