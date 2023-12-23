import clsx from 'clsx';
import { getTimeline } from '@src/domain/content';
import { convertDateString } from '@src/utils/time';
import { time } from 'console';

function PostLink({ title, slug, publishedOn }) {
  return (
    <a href={`/blog/${slug}`} className="group">
      <div className={clsx('flex items-center', '')}>
        <div
          className={clsx(
            'w-3/12',
            'text-xs opacity-60',
            'pl-8',
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

function TripLog(props) {
  return (
    <div className={clsx('flex items-center', '')}>
      <div
        className={clsx(
          'w-3/12',
          'text-xs opacity-60',
          'pl-8',
          'group-hover:opacity-90'
        )}
      >
        {convertDateString(props.createdAt)}
      </div>
      <div className={clsx('w-9/12', 'text-md leading-6', 'my-2')}>
        Landed in {props.endCity}
      </div>
    </div>
  );
}

function MicroPost(props) {
  return (
    <div className={clsx('flex items-center', '')}>
      <div
        className={clsx(
          'w-3/12',
          'text-xs opacity-60',
          'pl-8',
          'group-hover:opacity-90'
        )}
      >
        {convertDateString(props.publishedOn)}
      </div>
      <div
        className={clsx('w-9/12', 'text-md leading-6', 'my-2')}
        dangerouslySetInnerHTML={{ __html: props.contents }}
      />
    </div>
  );
}

function Timeline({}) {
  const timelineItems = getTimeline();
  return (
    <section className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
      {Object.keys(timelineItems)
        .sort((a, b) => b - a)
        .map((year) => {
          return (
            <div>
              <div className="pl-8 font-bold text-xs opacity-60 mt-8">
                {year}
              </div>
              {timelineItems[year].map((t) => {
                if (t.title) {
                  return <PostLink key={t.slug || t.title} {...t} />;
                } else if (t.startCity) {
                  return (
                    <TripLog key={`${t.createdAt}-${t.startCity}`} {...t} />
                  );
                } else {
                  return <MicroPost key={t.slug} {...t} />;
                }
              })}
            </div>
          );
        })}
    </section>
  );
}
export default Timeline;
