import config from "@src/config";

async function fetchWorkoutStats() {
  return await fetch(`${config.stateOfBeingBase}/${config.vault.workouts}`).then(
    (res) => res.json(),
  );
}

export { fetchWorkoutStats };
