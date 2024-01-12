import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type ProjectProps = {
  title: string;
  description: string;
  link: string;
  icon: string;
};

const projects: ProjectProps[] = [
  {
    title: 'Core Contributor at Status',
    description:
      'Status is a privacy focused super app for Ethereum. I help develop their mobile app.',
    link: 'https://status.app',
    icon: '/img/spotlightIcons/status.png',
  },
  {
    title: '[Paused] Co-founder at Meta Blocks',
    description:
      'Meta Blocks aimed to build an NFT upgrade protocol on Solana, but the idea didn’t work out.',
    link: 'https://metablocks.world',
    icon: '/img/spotlightIcons/mbk.png',
  },
  {
    title: 'Investor and Advisor at Skillstrainer',
    description:
      'Skillstrainer is the world’s largest vocational skilling platform with over 4m users in India and Africa.',
    link: 'https://skillstrainer.in',
    icon: '/img/spotlightIcons/st.png',
  },
];

function Project(props: PropsWithChildren<{ project: ProjectProps }>) {
  const { title, icon, link, description } = props.project;
  return (
    <div className={clsx('flex items-start', 'mt-3')}>
      <div className="shrink-0 pt-1 pr-2">
        <img
          src={icon}
          alt={'Project Icon'}
          className={clsx('w-[24px] h-[24px]', '')}
        />
      </div>
      <div className={clsx('')}>
        <h4 className={clsx('font-bold text-sm')}>{title}</h4>
        <p className={clsx('opacity-60 text-sm')}>{description}</p>
        <a
          href={link}
          target="_blank"
          className={clsx('text-sky-700 text-sm')}
        >
          {link}
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="w-[90%]">
      <p className="text-sm opacity-60 mb-4">
        For the past decade, I have been interested in SaaS and crypto. As of
        now, I’m learning more about ed-tech, immigration, content creation and
        bio-hacking.
      </p>
      {projects.map((p: ProjectProps) => (
        <Project
          key={p.link}
          project={p}
        />
      ))}
    </div>
  );
}

export default Projects;
