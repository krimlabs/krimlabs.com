import clsx from 'clsx';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { convertDateString } from '@src/utils/time';
import { Post, MicroPost, Trip } from '@contentlayer/generated';
import type { TimelineItem } from '@src/domain/content';

function PostLink(props: PropsWithChildren<{ post: Post }>) {
  const { title, slug, publishedOn } = props.post;
  return (
    <a href={`/blog/${slug}`} className="">
      <div
        className={clsx(
          'underline underline-offset-4 decoration-gray-200',
          'hover:decoration-pink-500 hover:bg-fuchsia-100/60',
          'text-md leading-6'
        )}
      >
        {title}
      </div>
    </a>
  );
}

function TripLog(props: PropsWithChildren<{ trip: Trip }>) {
  const { createdAt, endCity } = props.trip;
  return <div className={clsx('text-md leading-6')}>Landed in {endCity}</div>;
}

function MicroPostLog(props: PropsWithChildren<{ microPost: MicroPost }>) {
  const { body } = props.microPost;
  return (
    <div
      className={clsx('text-md leading-6')}
      dangerouslySetInnerHTML={{ __html: body.raw }}
    />
  );
}

function BaseTimelineLog(props: PropsWithChildren<{ t: TimelineItem }>) {
  const { t } = props;
  const getSrc = (itemType) => {
    if (itemType === 'Post') {
      return '/img/timelineIcons/post.svg';
    }

    if (itemType === 'MicroPost') {
      return '/img/timelineIcons/writing-bolt.svg';
    }

    if (itemType === 'Trip') {
      return '/img/timelineIcons/plane-landing.svg';
    }
  };
  return (
    <div className={clsx('flex items-center', 'group')}>
      <div
        className={clsx(
          'w-2/12',
          'text-xs opacity-60',
          'group-hover:opacity-90'
        )}
      >
        {convertDateString(t.createdAt || t.publishedOn).split(',')[0]}
      </div>
      <div className='w-1/12'>
        <img src={getSrc(t.type)} alt={`${t.type} icon`} className={clsx('w-6 h-6', 'opacity-50 group-hover:opacity-90')} />
      </div>
      <div className={clsx('w-8/12', 'text-md leading-6', 'my-2')}>
        {props.children}
      </div>
    </div>
  );
}

function ComputedComp(props: PropsWithChildren<{ t: TimelineItem }>) {
  const { t } = props;
  if (t.type === 'Post') {
    return <PostLink post={t} />;
  } else if (t.type === 'Trip') {
    return <TripLog trip={t} />;
  } else if (t.type === 'MicroPost') {
    return <MicroPostLog microPost={t} />;
  }
}

function TimelineLogs(
  props: PropsWithChildren<{ timelineItems: TimelineItem[]; year: string }>
) {
  const { timelineItems, year } = props;
  return (
    <>
      {timelineItems[year].map((t: TimelineItem) => {
        return (
          <BaseTimelineLog
            key={t.slug || t.title || `${t.createdAt}-${t.startCity}`}
            t={t}
          >
            <ComputedComp t={t} />
          </BaseTimelineLog>
        );
      })}
    </>
  );
}

function Filters(props: { selected: string }) {
  const types = ['All', 'Posts', 'Trips', 'Micro']
  return (
    <div className={clsx('flex', 'mt-4 md:mt-0 md:ml-8')}>
      {types.map(t => {
        const thisSelected = props.selected === t
        return <a
          href={`/${t === 'All' ? "" : t.toLowerCase()}`}
          key={t}
        >
          {thisSelected &&
            <div className={clsx(
              'w-12 h-12 rounded-full',
              'bg-gradient-to-r from-pink-200 to-yellow-400 blur-lg'
            )} />}

          <div className={clsx(
            { 'border border-gray-300': !thisSelected },
            'rounded',
            'px-5 py-1 mr-4',
            'font-bold text-sm',
            'cursor-pointer',
            { "bg-black text-white border-black": thisSelected },
            { 'backdrop-blur-md -mt-12': thisSelected })}>
            {t}
          </div>
        </a>
      })}
    </div>
  );
}

function Timeline({ timelineItems, filter }: { timelineItems: Record<number, TimelineItem[]>, filter: string }) {
  return (
    <section className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Filters selected={filter} />
      {Object.keys(timelineItems)
        .sort((a: string, b: string) => parseInt(b) - parseInt(a))
        .map((year: string) => {
          return (
            <div key={year} className="pl-0 md:pl-8">
              <div className="font-bold text-xs opacity-60 mt-8">{year}</div>
              <TimelineLogs year={year} timelineItems={timelineItems} />
            </div>
          );
        })}
    </section>
  );
}
export default Timeline;
