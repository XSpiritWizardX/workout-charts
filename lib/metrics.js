Export a helper like:
- async function getWorkoutVolumeByDay(db, orgId, { from, to })
- SQL groups by date(w.performed_on) and aggregates sets/reps/volume
- Return array of { date, total_sets, total_reps, total_volume }
- Handle NULL weights with COALESCE(weight, 0) and empty results with []
