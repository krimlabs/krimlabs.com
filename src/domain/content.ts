import cityTimezones from 'city-timezones';
import contentIndex from '@content/index.json';
import config from '@src/config';

const trips = contentIndex.trips;
const authors = contentIndex.authors;
const posts = contentIndex.posts;
const pages = contentIndex.pages;
const tags = contentIndex.tags;
const microPosts = contentIndex?.microPosts || contentIndex.microposts;

type Tag = {
  slug: string;
  title: string;
  icon?: string;
  featured?: boolean;
};

type Author = {
  slug: string;
  name: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  medium?: string;
  gpgKey?: string;
  clubhouse?: string;
  youtube?: string;
  profilePicture: string;
  shortBio: string;
  body: string;
};

type Post = {
  publishedOn?: string;
  title: string;
  subTitle?: string;
  canonicalUrl?: string;
  featured?: boolean;
  heroImg: string;
  slug: string;
  tags: string[];
  relatedSlugs?: string[];
  author: string;
  body: string;
};

type Trip = {
  createdAt: string;
  startCity: string;
  startCountry: string;
  endCity: string;
  endCountry: string;
};

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
  trip: Trip;
  timeAndOffset: string[];
} {
  const tripVals = Object.values(trips);

  const lastTrip = tripVals.reduce((maxObject: Trip, currentObject: Trip) => {
    const maxTimestamp = new Date(maxObject.createdAt).getTime();
    const currentTimestamp = new Date(currentObject.createdAt).getTime();
    return currentTimestamp > maxTimestamp ? currentObject : maxObject;
  }, tripVals[0]);

  const cityData = cityTimezones.lookupViaCity(lastTrip.endCity)[0];
  return {
    trip: lastTrip,
    timeAndOffset: getTimeInCityAndOffset(cityData),
  };
}

function getAllPosts(): Post[] {
  return Object.values(posts).filter((p) => p.publishedOn);
}

function getAllMicroPosts() {
  return Object.values(microPosts);
}

function getAllTrips() {
  return Object.values(trips);
}

function groupAndSortByYear(objects: any[]): { [year: number]: any[] } {
  return objects.reduce(
    (groupedByYear, obj) => {
      const year = new Date(obj.publishedOn || obj.createdAt).getFullYear();

      // Use an object spread to create a new object (avoid mutating the original)
      const updatedGrouped = {
        ...groupedByYear,
        [year]: [...(groupedByYear[year] || []), obj],
      };

      return {
        ...groupedByYear,
        [year]: updatedGrouped[year].sort(
          (a, b) =>
            new Date(b.publishedOn || b.createdAt).getTime() -
            new Date(a.publishedOn || a.createdAt).getTime()
        ),
      };
    },
    {} as { [year: number]: any[] }
  );
}

function getTimeline(posts) {
  // order by created at and group by year
  return groupAndSortByYear([
    ...getAllPosts(),
    ...getAllMicroPosts(),
    ...getAllTrips(),
  ]);
}

export { getLastTripAndEndCityTime, getAllPosts, getTimeline };
