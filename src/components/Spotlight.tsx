import clsx from 'clsx';
import React from 'react';

import { fetchWorkoutStats } from '@src/domain/workouts';
import { fetchMeditationAggregates } from '@src/domain/meditations';
import { fetchSleepAggregates } from '@src/domain/sleep';
import { getLastTripAndEndCityTime } from '@src/domain/content';
import Img from '@src/components/Img';
import StateItem, { BoltIcon } from '@src/components/StateItem';

import type { WorkoutStats } from '@src/domain/workouts';

const workoutStats = await fetchWorkoutStats();
const meditationAggregates = await fetchMeditationAggregates();
const sleepAggregates = await fetchSleepAggregates();

function daysUntilNovember2072(): string {
  const currentDate: Date = new Date();
  const november2072: Date = new Date(2072, 10, 1); // November is represented by 10 since months are zero-indexed

  const millisecondsInDay: number = 1000 * 60 * 60 * 24;
  const differenceInTime: number =
    november2072.getTime() - currentDate.getTime();

  const daysLeft: number = Math.floor(differenceInTime / millisecondsInDay);

  if (daysLeft >= 1000) {
    return Math.ceil(daysLeft / 1000) + 'k';
  } else {
    return daysLeft.toString();
  }
}

type SpotlightBaseCardProps = {
  bgColorClass: string;
  title: string;
  contentComponent: React.ComponentType<any>;
  icon: string;
  smallHeading?: boolean;
  ctaArrow?: 'out' | 'right';
  ctaLabel?: string;
  ctaLink?: string;
  ctaColorClass?: string;
  textColorClass?: string | '';
};

function SpotlightCta(props: SpotlightBaseCardProps) {
  return (
    <a
      href={props.ctaLink || '#'}
      target={
        props.ctaLink && props.ctaLink.startsWith('https://') ? '_blank' : ''
      }
    >
      <div
        className={clsx(
          props.ctaColorClass,
          'font-bold text-xl',
          'mt-3',
          'flex items-center',
          'hover:animate-pulse active:pt-1'
        )}
      >
        <div>{props.ctaLabel}</div>
        <div className="ml-1">
          {props.ctaArrow === 'right' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          )}
          {props.ctaArrow === 'out' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          )}
        </div>
      </div>
    </a>
  );
}

function SpotlightBaseCard(props: SpotlightBaseCardProps) {
  const Content = props.contentComponent;
  return (
    <div
      className={clsx(
        'bg-gradient-to-b',
        'rounded-xl',
        'flex flex-col',
        'py-3 px-4 mb-4',
        '',
        props.bgColorClass,
        props.textColorClass
      )}
    >
      <div className="flex justify-end">
        <Img
          path={props.icon}
          alt={`${props.title} icon`}
          defaultWidth={240}
          className={clsx(
            'mr-[-12%] sm:mr-[-10%] md:mr-[-24%] mb-[-48%]',
            'h-[96px] w-[96px]'
          )}
        />
      </div>

      <h2
        className={clsx('text-2xl font-bold mb-3', {
          'text-sm mb-[4px]': props.smallHeading,
        })}
      >
        {props.title}
      </h2>
      <div>{Content && <Content />}</div>
      {props.ctaLabel && <SpotlightCta {...props} />}
    </div>
  );
}

function OpenMeetContent() {
  return (
    <div className="text-sm leading-5 w-[80%]">
      <p>Meeting strangers increases the surface area for luck to land on.</p>
      <p className="mt-2">
        If you find anything I do interesting, we should meet. No agenda, just a
        30 minutes meeting. Preferably in person.
      </p>
    </div>
  );
}
const txfmStatsFactory = ({
  workoutStats,
  currentDay,
  numObservations,
  meditationEfficiency,
  showUpRate,
}: {
  workoutStats: WorkoutStats;
  currentDay: number;
  numObservations: number;
  showUpRate: string;
  meditationEfficiency: string;
}) => {
  return [
    {
      id: 'Workout',
      icon: BoltIcon,
      description: '100% means completion of 5 workouts per week.',
      val: workoutStats.latest.showUpRate,
      descriptor: '%',
    },
    {
      id: 'Meditation',
      icon: BoltIcon,
      description: '100% means completion of 1 meditation per day.',
      val: showUpRate,
      descriptor: '%',
    },
    {
      id: 'Awareness',
      icon: BoltIcon,
      description: '100% means recording of 2 observations per day.',
      val: (
        (numObservations * 100) /
        // target three observations per day
        (currentDay * 3)
      ).toFixed(0),
      descriptor: '%',
    },
    {
      id: 'Lucidity',
      icon: BoltIcon,
      description: '100% means every meditation enhanced my spirit.',
      val:
        meditationEfficiency !== 'NaN'
          ? parseFloat(meditationEfficiency).toFixed(0)
          : 0,
      descriptor: '%',
    },
    {
      id: 'Sleep',
      icon: BoltIcon,
      description: 'Sleep is a combination of various factors',
      val: sleepAggregates.latest.sleepIndex.toFixed(0),
    },
    {
      id: '~Time left',
      icon: BoltIcon,
      description:
        'Approximate number of days left in my life, assuming life span of 80.',
      val: daysUntilNovember2072(),
      descriptor: 'days',
    },
  ];
};

function StateOfBeingContent() {
  const { meditationEfficiency, showUpRate, numObservations } =
    meditationAggregates.latestForDashboard.stats;
  const { currentDay } = meditationAggregates.latestForDashboard;
  const txfmStats = txfmStatsFactory({
    workoutStats,
    currentDay,
    numObservations,
    meditationEfficiency,
    showUpRate,
  });
  return (
    <div className={clsx('grid grid-cols-1 gap-4', 'mt-2')}>
      {txfmStats.map((s) => {
        return (
          <div key={s.id}>
            {/* <h3 className={clsx('text-sm', 'mb-1', 'opacity-80')}>{s.key}</h3>
                <p className={clsx('text-3xl font-bold')}>
                {s.val}
                <span
                className="text-xs ml-1 opacity-60 font-normal"
                style={{ verticalAlign: 'super' }}
                >
                {s.descriptor}
                </span>
                </p> */}
            <StateItem {...s} />
          </div>
        );
      })}
    </div>
  );
}

function CurrentLocationContent() {
  const { trip, timeAndOffset } = getLastTripAndEndCityTime();

  return (
    <div>
      <p className={clsx('text-3xl font-bold')}>{trip.endCity}</p>
      <p className="text-sm mt-2 opacity-50">Timezone: {timeAndOffset[2]}</p>
    </div>
  );
}

function CurrentJobComponent() {
  return (
    <div className="w-[80%] md:w-[90%]">
      <p className={clsx('text-2xl font-bold')}>
        Sr. Clojure Engineer at Status
      </p>
    </div>
  );
}

function ClojureCourseContent() {
  return (
    <div className="w-[80%] md:w-[90%]">
      <p className={clsx('text-2xl font-bold', 'mt-2')}>
        Tinycanva - Clojure for React Developers
      </p>
    </div>
  );
}

const spotlightItems: Record<string, SpotlightBaseCardProps> = {
  // openMeet: {
  //   title: 'Open meet',
  //   contentComponent: OpenMeetContent,
  //   icon: '/img/spotlightIcons/salad-bowl.png',
  //   bgColorClass: 'from-[#ebffd3] to-[#ccffa8]',
  //   ctaLabel: 'Meet me',
  //   ctaColorClass: 'text-[#3D6520]',
  //   ctaArrow: 'out'
  // },
  stateOfBeing: {
    title: 'State of being',
    contentComponent: StateOfBeingContent,
    icon: '/img/spotlightIcons/orb.png',
    bgColorClass: 'from-[#D9D3FF] to-[#C0B6FC]',
    ctaLabel: 'View Dashboard',
    ctaColorClass: 'text-[#6157A1]',
    ctaArrow: 'right',
    ctaLink: '/state-of-being',
  },
  currentLocation: {
    title: 'Currently in',
    contentComponent: CurrentLocationContent,
    icon: '/img/spotlightIcons/globe.png',
    bgColorClass: 'from-[#D3F4FF] to-[#A8E6FF]',
    smallHeading: true,
  },
  currentJob: {
    title: 'Current job',
    icon: '/img/spotlightIcons/workbot.png',
    contentComponent: CurrentJobComponent,
    bgColorClass: 'from-[#FFE7B7] to-[#FFE0A8]',
    smallHeading: true,
    ctaLabel: 'LinkedIn',
    ctaLink: 'https://www.linkedin.com/in/shivekkhurana/',
    ctaColorClass: 'text-[#AC781C]',
    ctaArrow: 'out',
  },
  clojureCourse: {
    title: 'Want to learn Clojure ?',
    icon: '/img/spotlightIcons/paperclip.png',
    smallHeading: true,
    contentComponent: ClojureCourseContent,
    bgColorClass: 'from-[#434343] to-[#000000]',
    textColorClass: 'text-white',
    ctaLabel: 'View course',
    ctaColorClass: 'text-[#E5A3A6]',
    ctaArrow: 'out',
    ctaLink:
      'https://www.newline.co/courses/tinycanva-clojure-for-react-developers',
  },
};

function Spotlight() {
  return (
    <>
      {Object.keys(spotlightItems).map((id: string) => {
        const cardProps: SpotlightBaseCardProps = spotlightItems[id];
        return (
          <SpotlightBaseCard
            key={id}
            {...cardProps}
          />
        );
      })}
    </>
  );
}

export default Spotlight;
