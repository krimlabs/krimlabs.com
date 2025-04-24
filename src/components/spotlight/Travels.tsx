import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import {
  getLastTripAndEndCityTime,
  getTimelineTrips,
} from '@src/domain/content';
import type { Trip } from '@src/domain/content';
import { convertDateString } from '@src/utils/time';

function TripLog(props: PropsWithChildren<{ trip: Trip }>) {
  const { createdAt, endCity } = props.trip;
  return (
    <div className={clsx('flex items-center', 'text-sm')}>
      <div
        className={clsx('text-xs opacity-60', 'w-[24%] sm:w-[16%] md:w-[32%]')}
      >
        {convertDateString(createdAt || '')}
      </div>
      <div>
        <img
          src="/img/timelineIcons/plane-landing.svg"
          alt="Plane landing icon"
          className="w-4 h-4 opacity-80 mr-2"
        />
      </div>
      <div className={clsx('', 'flex flex-grow')}>Landed in {endCity}</div>
    </div>
  );
}

function Travels() {
  const { trip, timeAndOffset } = getLastTripAndEndCityTime();

  const trips = getTimelineTrips();
  return (
    <div>
      <p className={clsx('text-3xl font-bold')}>{trip.endCity}</p>
      <p className="">Timezone is {timeAndOffset[2]}</p>
      <p className="text-sm mt-4 font-bold">Recent trips</p>
      {trips['2025']
        .filter((item) => item.type === 'Trip')
        .map((t) => (
          <TripLog
            key={(t as Trip).createdAt}
            trip={t as Trip}
          />
        ))}
    </div>
  );
}

export default Travels;
