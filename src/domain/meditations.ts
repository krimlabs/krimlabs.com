import config from "@src/config";

async function fetchMeditationAggregates() {
  return await fetch(
    `${config.stateOfBeingBase}/${config.vault.meditations}`,
  ).then((res) => res.json());
}

export { fetchMeditationAggregates };
