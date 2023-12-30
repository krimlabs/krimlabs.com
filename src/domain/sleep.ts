import config from "@src/config";

async function fetchSleepAggregates() {
  return await fetch(`${config.stateOfBeingBase}/${config.vault.sleep}`).then(
    (res) => res.json(),
  );
}

export { fetchSleepAggregates };
