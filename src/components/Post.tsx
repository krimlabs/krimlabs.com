import React from 'react'
import {
  getAuthorBySlug,
} from '@src/domain/content';
import Markdown from '@src/components/Markdown';
import { convertDateString } from '@src/utils/time';
import type { Post as PostContentType, Author as AuthorContentType } from '@contentlayer/generated'

import image from '@src/utils/image';

const shareUrls = {
  twitter: (link = '', message = '') =>
    `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(link)}`,
  facebook: (link = '') => `https://facebook.com/sharer/sharer.php?u=${link}`,
  linkedin: (link = '', message = '') =>
    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      link
    )}
    &title=${encodeURIComponent(message)}&summary=${encodeURIComponent(
      message
    )}&source=${encodeURIComponent(link)}`,
  mail: (link = '', subject, body) =>
    `mailto:?subject=${encodeURIComponent(
      subject || ''
    )}&body=${encodeURIComponent((body && `${body}\n\n${link}`) || link)}`,
  whatsapp: (link = '', message = '') =>
    `whatsapp://send?text=${encodeURIComponent(message)}%20${encodeURIComponent(
      link
    )}`,
  telegram: (link = '', message = '') =>
    `https://telegram.me/share/url?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(link)}`,
  hn: (link = '', message = '') =>
    `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(
      link
    )}&t=${encodeURIComponent(message)}`,
};

function Share({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex">
      <a
        href={shareUrls.twitter(url, `${title} by @shivek_khurana`)}
        className="pointer"
        target="_blank"
      >
        Twitter
      </a>
    </div>
  );
}

const AuthorImage = ({ profilePicture, name }: AuthorContentType) => {
  const optimizedPaths = image.getOptimizedPaths(profilePicture);
  return <img src={optimizedPaths.w80} className="br-100" alt={name} />;
};

const Author = ({
  slug,
  publishedOn,
}: {
  slug: string;
  publishedOn: string;
}) => {
  const author = getAuthorBySlug(slug);
  return (
    <div className="flex mt4 items-center justify-between">
      <div className="flex items-center">
        <div className="w3">
          <AuthorImage {...author} />
        </div>
        <div className="pl2">
          <div className="b f6">{author.name}</div>
          <div className="f7 mt1 bp3-text-muted mb2">
            {convertDateString(publishedOn)}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostProps {
  post: PostContentType;
}

function Post({ post }: PostProps) {
  const {
    heroImg,
    title,
    subTitle,
    publishedOn,
    slug,
    canonicalUrl,
    relatedPosts,
    author,
    contents,
  } = post;
  return (
    <div>
      <div className="mx-auto w-10/12 md:w-8/12 lg:w-6/12">
        <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold mt-5">
          {title}
        </h1>
        {subTitle && (
          <h2 className="text-lg md:text-xl lg:text-3xl text-black-80 mt-1 mb-2 text-muted">
            {subTitle}
          </h2>
        )}
        <Author slug={author} publishedOn={publishedOn} />
        <Share title={title} url={`https://krimlabs.com/blog/${slug}`} />
      </div>

      {heroImg && (
        <div className="mx-auto w-10/12 md:w-8/12 lg:w-6/12 my-4">
          <img src={heroImg} className="rounded-md" />
        </div>
      )}

      <Markdown post={post} />

      <div className="mx-auto w-10/12 md:w-8/12 lg:w-50">
        <div className="text-lg">
          {/* {canonicalUrl && <CanonicalRef canonicalUrl={canonicalUrl} />} */}

          <div>
            <div className="uppercase text-xs font-semibold mb-3">
              Share this post
            </div>
            <Share title={title} url={`https://krimlabs.com/blog/${slug}`} />
          </div>
        </div>
        {/* {relatedPosts.length > 0 && <Related relatedPosts={relatedPosts} />} */}
      </div>
    </div>
  );
}

export default Post;
