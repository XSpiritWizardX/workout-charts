Create createSummaryRouter(db) and implement GET /api/orgs/:orgId/summary. Return JSON like { orgId, range: { from, to }, totals: { workout_count, total_volume, total_sets, total_reps }, prs: [{ name, est_1rm }], recent_workouts: [{ id, title, performed_on, notes, total_volume }] }.

Implementation sketch:
- add small Promise helpers for db.get and db.all
- totals SQL (last 30 days):
  SELECT COUNT(DISTINCT w.id) AS workout_count,
         COALESCE(SUM(e.sets * e.reps * e.weight), 0) AS total_volume,
         COALESCE(SUM(e.sets), 0) AS total_sets,
         COALESCE(SUM(e.sets * e.reps), 0) AS total_reps
  FROM workouts w LEFT JOIN exercises e ON e.workout_id = w.id
  WHERE w.org_id = ? AND w.performed_on >= ?
- PRs SQL (Epley 1RM):
  SELECT e.name, MAX(e.weight * (1 + e.reps / 30.0)) AS est_1rm
  FROM exercises e JOIN workouts w ON w.id = e.workout_id
  WHERE w.org_id = ? GROUP BY e.name ORDER BY est_1rm DESC LIMIT 5
- recent workouts SQL:
  SELECT w.id, w.title, w.performed_on, w.notes,
         COALESCE(SUM(e.sets * e.reps * e.weight), 0) AS total_volume
  FROM workouts w LEFT JOIN exercises e ON e.workout_id = w.id
  WHERE w.org_id = ? GROUP BY w.id ORDER BY w.performed_on DESC LIMIT 5
- validate orgId and return 404 if org not found.
