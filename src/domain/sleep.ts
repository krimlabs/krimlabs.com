import config from "@src/config";

async function fetchSleepAggregates() {
  return await fetch(`${config.statOfBeingBase}/${config.vault.sleep}`).then(
    (res) => res.json(),
  );
}

export { fetchSleepAggregates };
