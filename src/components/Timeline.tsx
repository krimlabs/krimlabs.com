import clsx from 'clsx';
import React from 'react';
import type { PropsWithChildren } from 'react';
import { getTimeline } from '@src/domain/content';
import { convertDateString } from '@src/utils/time';
import type { Post, MicroPost, Trip } from '@contentlayer/generated'
import type { TimelineItem } from '@src/domain/content';

function PostLink(props: PropsWithChildren<{ post: Post }>) {
  const { title, slug, publishedOn } = props.post
  return (
    <a href={`/blog/${slug}`} className="group">
      <div className={clsx('flex items-center', '')}>
        <div
          className={clsx(
            'w-3/12',
            'text-xs opacity-60',
            'group-hover:opacity-90'
          )}
        >
          {convertDateString(publishedOn)}
        </div>
        <div
          className={clsx(
            'w-9/12',
            'underline underline-offset-4 decoration-gray-200',
            'group-hover:decoration-pink-500 group-hover:bg-fuchsia-100/60',
            'text-md leading-6',
            'my-2'
          )}
        >
          {title}
        </div>
      </div>
    </a>
  );
}

function TripLog(props: PropsWithChildren<{ trip: Trip }>) {
  const { createdAt, endCity } = props.trip
  return (
    <div className={clsx('flex items-center', '')}>
      <div
        className={clsx(
          'w-3/12',
          'text-xs opacity-60',
          'group-hover:opacity-90'
        )}
      >
        {convertDateString(createdAt)}
      </div>
      <div className={clsx('w-9/12', 'text-md leading-6', 'my-2')}>
        Landed in {endCity}
      </div>
    </div>
  );
}

function MicroPostLog(props: PropsWithChildren<{ microPost: MicroPost }>) {
  const { publishedOn, body } = props.microPost
  return (
    <div className={clsx('flex items-center', '')}>
      <div
        className={clsx(
          'w-3/12',
          'text-xs opacity-60',
          'group-hover:opacity-90'
        )}
      >
        {convertDateString(publishedOn)}
      </div>
      <div
        className={clsx('w-9/12', 'text-md leading-6', 'my-2')}
        dangerouslySetInnerHTML={{ __html: body.raw }}
      />
    </div>
  );
}

function Timeline({ }) {
  const timelineItems = getTimeline();
  return (
    <section className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
      {Object.keys(timelineItems)
        .sort((a: string, b: string) => parseInt(b) - parseInt(a))
        .map((year: string) => {
          return (
            <div key={year} className='pl-0 md:pl-8'>
              <div className="font-bold text-xs opacity-60 mt-8">
                {year}
              </div>
              {timelineItems[year].map((t: TimelineItem) => {
                if (t.hasOwnProperty('slug') && t.hasOwnProperty('featured') && t.hasOwnProperty('heroImg')) {
                  return <PostLink key={t.slug || t.title} post={t} />;
                } else if (t.hasOwnProperty('startCity')) {
                  return (
                    <TripLog key={`${t.createdAt}-${t.startCity}`} trip={t} />
                  );
                } else if (t.hasOwnProperty('slug') && !t.hasOwnProperty('heroImg')) {
                  return <MicroPostLog key={t.slug} microPost={t} />;
                }
              })}
            </div>
          );
        })}
    </section>
  );
}
export default Timeline;
