import clsx from "clsx";

import { fetchWorkoutStats } from "@src/domain/workouts";
import { fetchMeditationAggregates } from "@src/domain/meditations";
import { fetchSleepAggregates } from "@src/domain/sleep";
import When from "@src/components/When";

import orbIcon from "@src/img/spotlightIcons/orb.png";
import globeIcon from "@src/img/spotlightIcons/globe.png";
import paperclipIcon from "@src/img/spotlightIcons/paperclip.png";
import workbotIcon from "@src/img/spotlightIcons/workbot.png";
import saladBowlIcon from "@src/img/spotlightIcons/salad-bowl.png";

const workoutStats = await fetchWorkoutStats();
const meditationAggregates = await fetchMeditationAggregates();
const sleepAggregates = await fetchSleepAggregates();

function daysUntilNovember2074(): string {
  const currentDate: Date = new Date();
  const november2074: Date = new Date(2074, 10, 1); // November is represented by 10 since months are zero-indexed

  const millisecondsInDay: number = 1000 * 60 * 60 * 24;
  const differenceInTime: number =
    november2074.getTime() - currentDate.getTime();

  const daysLeft: number = Math.floor(differenceInTime / millisecondsInDay);

  if (daysLeft >= 1000) {
    return Math.ceil(daysLeft / 1000) + "k";
  } else {
    return daysLeft.toString();
  }
}

type SpotlightBaseCardProps = {
  bgColorClass: string;
  title: string;
  contentComponent: React.ComponentType<any>;
  icon: any;
  ctaLabel?: string;
  ctaColorClass?: string;
  textColorClass?: string | "";
};

function SpotlightBaseCard(props: SpotlightBaseCardProps) {
  const Content = props.contentComponent;
  return (
    <div
      className={clsx(
        "bg-gradient-to-b",
        "rounded-xl",
        "flex flex-col",
        "py-3 px-4 mb-4",
        "",
        props.bgColorClass,
        props.textColorClass,
      )}
    >
      <div className="flex justify-end">
        <img
          src={props.icon.src}
          className={clsx("mr-[-24%] mb-[-48%]", "h-[96px] w-[96px]")}
        />
      </div>

      <h2 className="text-2xl font-bold mb-3">{props.title}</h2>
      <div>{Content && <Content />}</div>
      <div className={clsx(props.ctaColorClass, "font-bold text-xl", "mt-3")}>
        {props.ctaLabel}
      </div>
    </div>
  );
}

function OpenMeetContent() {
  return (
    <div className="text-sm w-[80%]">
      <p>Meeting strangers increases the surface area for luck to land on.</p>
      <p className="mt-2">
        If you find anything I do interesting, we should meet. No agenda, just a
        30 minutes meeting. Preferably in person.
      </p>
    </div>
  );
}

function StateOfBeingContent() {
  const txfmStats = [
    {
      key: "Workout",
      description: "100% means completion of 5 workouts per week.",
      val: ((workoutStats.latest * 100) / workoutStats.weekdaysPassed).toFixed(
        0,
      ),
      descriptor: "%",
    },
    {
      key: "Meditation",
      description: "100% means completion of 1 meditation per day.",
      val: (
        (meditationAggregates.latestForDashboard.stats.numMeditations * 100) /
        meditationAggregates.latestForDashboard.currentDay
      ).toFixed(0),
      descriptor: "%",
    },
    {
      key: "Awareness",
      description: "100% means recording of 2 observations per day.",
      val: (
        (meditationAggregates.latestForDashboard.stats.numObservations * 100) /
        // target two observations per day
        (meditationAggregates.latestForDashboard.currentDay * 2)
      ).toFixed(0),
      descriptor: "%",
    },
    {
      key: "Spirit",
      description: "100% means every meditation enhanced my spirit.",
      val: parseFloat(
        meditationAggregates.latestForDashboard.stats.meditationEfficiency,
      ),
      descriptor: "%",
    },
    {
      key: "Sleep",
      description: "Sleep is a combination of various factors",
      val: sleepAggregates.latest.sleepIndex,
    },
    {
      key: "~Time left",
      description:
        "Approximate number of days left in my life, assuming life span of 80.",
      val: daysUntilNovember2074(),
      descriptor: "days",
    },
  ];
  return (
    <div className={clsx("grid grid-cols-2 gap-4", "mt-2")}>
      {txfmStats.map((s) => {
        return (
          <div key={s.key}>
            <h3 className={clsx("text-sm", "mb-1", "opacity-80")}>{s.key}</h3>
            <p className={clsx("text-3xl font-bold")}>
              {s.val}
              <span
                className="text-xs ml-1 opacity-60 font-normal"
                style={{ verticalAlign: "super" }}
              >
                {s.descriptor}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

const spotlightItems: Record<string, SpotlightBaseCardProps> = {
  openMeet: {
    title: "Open meet",
    contentComponent: OpenMeetContent,
    icon: saladBowlIcon,
    bgColorClass: "from-[#ebffd3] to-[#ccffa8]",
    ctaLabel: "Meet me",
    ctaColorClass: "text-[#3D6520]",
  },
  stateOfBeing: {
    title: "State of being",
    contentComponent: StateOfBeingContent,
    icon: orbIcon,
    bgColorClass: "from-[#D9D3FF] to-[#C0B6FC]",
    ctaLabel: "Learn more",
    ctaColorClass: "text-[#6157A1]",
  },
  currentLocation: {
    title: "Currently in",
    icon: globeIcon,
    bgColorClass: "from-[#D3F4FF] to-[#A8E6FF]",
  },
  currentJob: {
    title: "Working at",
    icon: workbotIcon,
    bgColorClass: "from-[#FFE7B7] to-[#FFE0A8]",
    ctaLabel: "LinkedIn",
    ctaColorClass: "text-[#AC781C]",
  },
  clojureCourse: {
    title: "Clojure course",
    icon: paperclipIcon,
    bgColorClass: "from-[#434343] to-[#000000]",
    textColorClass: "text-white",
    ctaLabel: "View course",
    ctaColorClass: "text-[#E5A3A6]",
  },
};

function Spotlight() {
  return (
    <>
      {Object.keys(spotlightItems).map((id: string) => {
        const cardProps: SpotlightBaseCardProps = spotlightItems[id];
        return <SpotlightBaseCard key={id} {...cardProps} />;
      })}
    </>
  );
}

export default Spotlight;
