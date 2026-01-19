Create a small vanilla JS app that mounts into a new <section id="app"></section> in public/index.html and runs on DOMContentLoaded.
State: { orgs: [], selectedOrgId: null, workouts: [], exercisesByWorkout: {} } with localStorage for selected org.
UI: org selector + create org form; workout list with add workout form; per-workout exercise list with add exercise form; inline success/error messages.
API: GET/POST /api/orgs, GET/POST /api/orgs/:orgId/workouts, GET/POST /api/workouts/:workoutId/exercises with fetch + JSON; re-fetch or update state on success.
