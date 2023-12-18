import config from "@src/config";

async function fetchMeditationAggregates() {
  return await fetch(
    `${config.statOfBeingBase}/${config.vault.meditations}`,
  ).then((res) => res.json());
}

export { fetchMeditationAggregates };
