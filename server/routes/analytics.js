Response shape:
{
  org_id,
  range: { from, to },
  totals: { workouts, sets, reps, volume },
  by_day: [ { date, workouts, sets, reps, volume } ],
  top_exercises: [ { name, sets, reps, volume } ]
}
Notes: volume = sum(sets * reps * weight) with weight defaulting to 0; range defaults to the last 30 days when missing.
