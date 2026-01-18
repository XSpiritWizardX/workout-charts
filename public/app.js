const orgForm = document.getElementById("org-form");
const orgName = document.getElementById("org-name");
const orgList = document.getElementById("org-list");
const orgSelect = document.getElementById("org-select");

const workoutForm = document.getElementById("workout-form");
const workoutTitle = document.getElementById("workout-title");
const workoutDate = document.getElementById("workout-date");
const workoutNotes = document.getElementById("workout-notes");
const workoutList = document.getElementById("workout-list");
const workoutSelect = document.getElementById("workout-select");

const exerciseForm = document.getElementById("exercise-form");
const exerciseName = document.getElementById("exercise-name");
const exerciseSets = document.getElementById("exercise-sets");
const exerciseReps = document.getElementById("exercise-reps");
const exerciseWeight = document.getElementById("exercise-weight");
const exerciseList = document.getElementById("exercise-list");

const refreshButton = document.getElementById("refresh-workouts");
const refreshExercisesButton = document.getElementById("refresh-exercises");

const fetchJSON = (url, options) =>
  fetch(url, options).then((res) => res.json());

const loadOrgs = async () => {
  const orgs = await fetchJSON("/api/orgs");
  orgList.innerHTML = orgs
    .map((org) => `<div class="item">${org.name}</div>`)
    .join("") || "<div class=\"item\">No orgs yet</div>";

  orgSelect.innerHTML = orgs
    .map((org) => `<option value="${org.id}">${org.name}</option>`)
    .join("");
};

const loadWorkouts = async () => {
  const orgId = orgSelect.value;
  if (!orgId) {
    workoutList.innerHTML = "<div class=\"item\">Create an org first</div>";
    return;
  }
  const workouts = await fetchJSON(`/api/orgs/${orgId}/workouts`);
  workoutList.innerHTML = workouts
    .map(
      (w) =>
        `<div class="item">${w.title}<small>${w.performed_on || "No date"}</small></div>`
    )
    .join("") || "<div class=\"item\">No workouts yet</div>";

  workoutSelect.innerHTML = workouts
    .map((w) => `<option value="${w.id}">${w.title}</option>`)
    .join("");
};

const loadExercises = async () => {
  const workoutId = workoutSelect.value;
  if (!workoutId) {
    exerciseList.innerHTML = "<div class=\"item\">Add a workout first</div>";
    return;
  }
  const exercises = await fetchJSON(`/api/workouts/${workoutId}/exercises`);
  exerciseList.innerHTML = exercises
    .map(
      (e) =>
        `<div class="item">${e.name}<small>${e.sets || 0} sets x ${e.reps || 0} reps @ ${e.weight || 0} lb</small></div>`
    )
    .join("") || "<div class=\"item\">No exercises yet</div>";
};

orgForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = orgName.value.trim();
  if (!name) return;
  await fetchJSON("/api/orgs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  orgName.value = "";
  await loadOrgs();
  await loadWorkouts();
});

workoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const orgId = orgSelect.value;
  if (!orgId) return;
  await fetchJSON(`/api/orgs/${orgId}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: workoutTitle.value.trim(),
      performed_on: workoutDate.value,
      notes: workoutNotes.value.trim()
    })
  });
  workoutTitle.value = "";
  workoutDate.value = "";
  workoutNotes.value = "";
  await loadWorkouts();
});

exerciseForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const workoutId = workoutSelect.value;
  if (!workoutId) return;
  await fetchJSON(`/api/workouts/${workoutId}/exercises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: exerciseName.value.trim(),
      sets: exerciseSets.value,
      reps: exerciseReps.value,
      weight: exerciseWeight.value
    })
  });
  exerciseName.value = "";
  exerciseSets.value = "";
  exerciseReps.value = "";
  exerciseWeight.value = "";
  await loadExercises();
});

refreshButton.addEventListener("click", loadWorkouts);
refreshExercisesButton.addEventListener("click", loadExercises);

const init = async () => {
  await loadOrgs();
  await loadWorkouts();
  await loadExercises();
};

init();
