import React from 'react';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

function BoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
      />
    </svg>
  );
}

export type StateItemProps = {
  id: string;
  icon: React.ComponentType<any>;
  description: string;
  itemType?: 'bar' | 'count' | 'death';
  barProps?: {
    target: number;
    current: number;
    showUpRate: string;
  };
  countProps?: {
    value: string;
  };
  deathProps?: {
    daysLeft: string;
  };
};

function StateItem(props: PropsWithChildren<StateItemProps>) {
  const Icon = props.icon;
  return (
    <div>
      <div className={clsx('flex items-start')}>
        <Icon />
        <div className="ml-1">
          <h3 className={clsx('text-md', 'mb-1', 'font-bold')}>{props.id}</h3>
          <p className={clsx('opacity-60 text-sm')}>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

export { BoltIcon };
export default StateItem;
