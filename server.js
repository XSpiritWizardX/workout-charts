const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const dbFile = path.join(__dirname, "data.sqlite");
const db = new sqlite3.Database(dbFile);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });

const init = async () => {
  await run(
    "CREATE TABLE IF NOT EXISTS organizations (id INTEGER PRIMARY KEY, name TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)"
  );
  await run(
    "CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, org_id INTEGER NOT NULL, title TEXT NOT NULL, performed_on TEXT, notes TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (org_id) REFERENCES organizations(id))"
  );
  await run(
    "CREATE TABLE IF NOT EXISTS exercises (id INTEGER PRIMARY KEY, workout_id INTEGER NOT NULL, name TEXT NOT NULL, sets INTEGER, reps INTEGER, weight REAL, created_at TEXT DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (workout_id) REFERENCES workouts(id))"
  );
};

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/orgs", async (_req, res) => {
  const rows = await all("SELECT * FROM organizations ORDER BY id DESC");
  res.json(rows);
});

app.post("/api/orgs", async (req, res) => {
  const name = String(req.body.name || "").trim();
  if (!name) return res.status(400).json({ error: "name required" });
  const result = await run("INSERT INTO organizations (name) VALUES (?)", [name]);
  const org = await get("SELECT * FROM organizations WHERE id = ?", [result.id]);
  res.status(201).json(org);
});

app.get("/api/orgs/:orgId/workouts", async (req, res) => {
  const orgId = Number(req.params.orgId);
  const rows = await all(
    "SELECT * FROM workouts WHERE org_id = ? ORDER BY performed_on DESC, id DESC",
    [orgId]
  );
  res.json(rows);
});

app.post("/api/orgs/:orgId/workouts", async (req, res) => {
  const orgId = Number(req.params.orgId);
  const title = String(req.body.title || "").trim();
  const performedOn = String(req.body.performed_on || "").trim() || null;
  const notes = String(req.body.notes || "").trim() || null;
  if (!title) return res.status(400).json({ error: "title required" });
  const result = await run(
    "INSERT INTO workouts (org_id, title, performed_on, notes) VALUES (?, ?, ?, ?)",
    [orgId, title, performedOn, notes]
  );
  const workout = await get("SELECT * FROM workouts WHERE id = ?", [result.id]);
  res.status(201).json(workout);
});

app.get("/api/workouts/:workoutId/exercises", async (req, res) => {
  const workoutId = Number(req.params.workoutId);
  const rows = await all(
    "SELECT * FROM exercises WHERE workout_id = ? ORDER BY id DESC",
    [workoutId]
  );
  res.json(rows);
});

app.post("/api/workouts/:workoutId/exercises", async (req, res) => {
  const workoutId = Number(req.params.workoutId);
  const name = String(req.body.name || "").trim();
  if (!name) return res.status(400).json({ error: "name required" });
  const sets = Number(req.body.sets || 0) || null;
  const reps = Number(req.body.reps || 0) || null;
  const weight = Number(req.body.weight || 0) || null;
  const result = await run(
    "INSERT INTO exercises (workout_id, name, sets, reps, weight) VALUES (?, ?, ?, ?, ?)",
    [workoutId, name, sets, reps, weight]
  );
  const exercise = await get("SELECT * FROM exercises WHERE id = ?", [result.id]);
  res.status(201).json(exercise);
});

const port = process.env.PORT || 3000;
init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Workout SaaS listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to init db", err);
    process.exit(1);
  });
