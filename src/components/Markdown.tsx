import React from 'react';
import clsx from 'clsx';
import convert from 'htmr';

import '@src/components/markdown.css';

const transform = {
  p: ({ children }) => {
    const el = children[0];
    const isElImg =
      el.props &&
      el.props.hasOwnProperty('alt') &&
      el.props.hasOwnProperty('src');
    return (
      <p
        className={clsx('mx-auto', {
          'text-center': isElImg,
          'w-10/12 md:w-8/12 lg:w-6/12': !isElImg,
        })}
      >
        {children}
      </p>
    );
  },
  //   pre: ({ props, children }) => (
  //     <div className="w-[9/10] md:w-8/12-m lg:w-6/12 mx-auto">
  //       <pre {...props}>{children}</pre>
  //     </div>
  //   ),
  h1: ({ children }) => (
    <h1
      className={clsx(
        'mx-auto w-10/12 md:w-8/12 lg:w-6/12 text-2xl',
        'mt-4 mb-3',
        'font-bold'
      )}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className={clsx(
        'mx-auto w-10/12 md:w-8/12 lg:w-6/12 text-xl',
        'mt-3 mb-2',
        'font-bold'
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className={clsx(
        'mx-auto w-10/12 md:w-8/12 lg:w-6/12 text-lg',
        'mt-2 mb-1',
        'font-bold'
      )}
    >
      {children}
    </h3>
  ),
  hr: ({ children }) => <hr className="mx-auto w-[9/10] md:w-8/12 lg:w-6/12" />,
  ul: ({ children }) => (
    <ul className="mx-auto w-10/12 md:w-8/12 lg:w-6/12">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mx-auto w-10/12 md:w-8/12 lg:w-6/12">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-3 list-inside list-disc">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="font-serif italic text-3xl">{children}</blockquote>
  ),
  a: ({ href, children }) => {
    if (href.startsWith('https://gist.github.com')) {
      // Handle specific case
    }
    return (
      <a href={href} target="_blank">
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const srcParts = src.split('?');
    const size = srcParts[1];
    return (
      <img
        src={src}
        className={clsx('mx-auto', {
          'w-auto': size === 'original',
          'w-10/12 md:w-8/12 lg:w-6/12': size === 'medium' || !size,
          'w-10/12 md:w-8/12': size === 'large',
          'w-10/12': size === 'x-large',
        })}
        alt={String(alt)}
      />
    );
  },
};

const Markdown = ({ contents }) => {
  return (
    <div className="markdown break-words">
      {contents && convert(contents, { transform })}
    </div>
  );
};

export default Markdown;
