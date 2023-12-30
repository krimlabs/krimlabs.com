import cityTimezones from 'city-timezones';
import { allPosts, allTrips, allMicroPosts, allAuthors, allTags } from '@contentlayer/generated';
import type { Post, Trip, Author, Tag, MicroPost } from '@contentlayer/generated'

type CityData = {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  pop: number;
  country: string;
  iso2: string;
  iso3: string;
  province: string;
  exactCity: string;
  exactProvince: string;
  state_ansi: string;
  timezone: string;
};

function getTimeInCityAndOffset(cityData: CityData): string[] {
  const { timezone } = cityData;
  const currentTime = new Date().toLocaleString('en-US', {
    timeZone: timezone,
    hour12: false,
    timeZoneName: 'shortOffset',
  });

  return currentTime
    .split(', ')
    .map((i) => i.split(' ').map((j) => j.trim()))
    .flat();
}

function getLastTripAndEndCityTime(): {
  trip: Trip
  timeAndOffset: string[];
} {
  const trips = getAllTrips();

  const lastTrip = trips.reduce((maxObject: Trip, currentObject: Trip) => {
    const maxTimestamp = new Date(maxObject.createdAt).getTime();
    const currentTimestamp = new Date(currentObject.createdAt).getTime();
    return currentTimestamp > maxTimestamp ? currentObject : maxObject;
  }, trips[0]);

  const cityData = cityTimezones.lookupViaCity(lastTrip.endCity)[0];
  return {
    trip: lastTrip,
    timeAndOffset: getTimeInCityAndOffset(cityData),
  };
}

function getAllPosts(): Post[] {
  return allPosts.filter((p: Post) => p.publishedOn);
}

function getAllMicroPosts(): MicroPost[] {
  return allMicroPosts
}

function getAllTrips(): Trip[] {
  return allTrips
}

function getAllAuthors(): Author[] {
  return allAuthors
}

export type TimelineItem = (Post | MicroPost | Trip)
function groupAndSortByYear(objects: TimelineItem[]): { [year: number]: TimelineItem[] } {
  return objects.reduce(
    (groupedByYear, obj) => {
      const year: number = new Date(obj.publishedOn || obj.createdAt).getFullYear();

      // Use an object spread to create a new object (avoid mutating the original)
      const updatedGrouped = {
        ...groupedByYear,
        [year]: [...(groupedByYear[year] || []), obj],
      };

      return {
        ...groupedByYear,
        [year]: updatedGrouped[year].sort(
          (a: TimelineItem, b: TimelineItem) =>
            new Date(b.publishedOn || b.createdAt).getTime() -
            new Date(a.publishedOn || a.createdAt).getTime()
        ),
      };
    },
    {} as { [year: number]: any[] }
  );
}

function getTimeline(): Record<number, TimelineItem[]> {
  // order by created at and group by year
  return groupAndSortByYear([
    ...getAllPosts(),
    ...getAllMicroPosts(),
    ...getAllTrips(),
  ]);
}

function getTimelinePosts(): Record<number, TimelineItem[]> {
  // order by created at and group by year
  return groupAndSortByYear([
    ...getAllPosts(),
  ]);
}

function getTimelineTrips(): Record<number, TimelineItem[]> {
  // order by created at and group by year
  return groupAndSortByYear([
    ...getAllTrips(),
  ]);
}

function getTimelineMicroPosts(): Record<number, TimelineItem[]> {
  // order by created at and group by year
  return groupAndSortByYear([
    ...getAllMicroPosts(),
  ]);
}

function getAuthorBySlug(slug: string): Author {
  return getAllAuthors().find((a: Author) => a.slug === slug);
}

export { getLastTripAndEndCityTime, getAllPosts, getTimeline, getAuthorBySlug, getTimelinePosts, getTimelineTrips, getTimelineMicroPosts };
export type { Post, Author, Trip, Tag };
