import clsx from 'clsx';
import { getAllPosts } from '@src/domain/content';
import { convertDateString } from '@src/utils/time';

function PostLink({ frontmatter }) {
  const { title, publishedOn, slug } = frontmatter;
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

function Timeline({ timelineItems }) {
  const posts = [];
  return (
    <section className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
      {timelineItems.map((t) => (
        <PostLink key={t.frontmatter.slug || t.frontmatter.title} {...t} />
      ))}
    </section>
  );
}
export default Timeline;
