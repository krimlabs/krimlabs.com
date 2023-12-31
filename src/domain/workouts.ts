import config from "@src/config";

type WorkoutMonthData = {
  target: number;
  count: number;
  showUpRate: string;
};

type YearData = {
  [month: string]: WorkoutMonthData;
};

type YearlyAggregates = {
  totalWorkouts: number;
  averageWorkoutsPerMonth: number;
  monthWithMostWorkouts: string;
  monthWithLeastWorkouts: string;
};

export type WorkoutStats = {
  latest: WorkoutMonthData;
  weekdays: number;
  weekdaysPassed: number;
  currentYear: number;
  currentMonth: number;
  byYearMonth: {
    [year: string]: YearData;
  };
  aggregates: {
    [year: string]: YearlyAggregates;
  };
};

async function fetchWorkoutStats(): Promise<WorkoutStats> {
  return await fetch(`${config.stateOfBeingBase}/${config.vault.workouts}`).then(
    (res) => res.json(),
  );
}

export { fetchWorkoutStats };
