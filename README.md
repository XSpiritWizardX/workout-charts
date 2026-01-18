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

## API
- `GET /api/orgs`
- `POST /api/orgs` `{ "name": "Team Alpha" }`
- `GET /api/orgs/:orgId/workouts`
- `POST /api/orgs/:orgId/workouts` `{ "title": "Leg Day", "performed_on": "2025-01-01", "notes": "Felt strong" }`
- `GET /api/workouts/:workoutId/exercises`
- `POST /api/workouts/:workoutId/exercises` `{ "name": "Squat", "sets": 5, "reps": 5, "weight": 225 }`

## Notes
This is a lightweight starter. Add auth, billing, and role-based access to turn it into a full SaaS.
