import React from 'react';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

function BoltIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className=""
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className=""
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
}

function TimeIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}

function FireIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    </div>
  );
}

function SpaceIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
        />
      </svg>
    </div>
  );
}

function EyeIcon() {
  return (
    <div className="w-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
  );
}

function healthColorClass(health: number | string | undefined): string {
  const intHealth = parseInt(health || 0);
  if (intHealth >= 0) {
    if (intHealth >= 0 && intHealth <= 33) {
      return 'bg-[#F7D0CC]';
    } else if (intHealth > 33 && intHealth <= 66) {
      return 'bg-[#FFF7D8]';
    } else if (intHealth > 66) {
      return 'bg-[#B2E7C1]';
    }
  }
  return ''; // You can handle other cases (e.g., negative health) here
}

export type StateItemProps = {
  id: string;
  icon: React.ComponentType<any>;
  description: string;
  containerClassName?: string;
  descriptor?: string;
  itemType?: 'bar' | 'count' | 'death';
  barProps?: {
    target: number;
    current: number;
    showUpRate: string;
  };
  countProps?: {
    value: string | number;
  };
  deathProps?: {
    daysLeft: string;
  };
};

function StateBar(props: PropsWithChildren<StateItemProps>) {
  // alteast show as 10% full even if count is 0
  const barBaseWidth = 10;

  const barWidth =
    barBaseWidth +
    ((props.barProps?.current || 0) / (props.barProps?.target || 1)) * 90;

  const colorClass = healthColorClass(props.barProps?.showUpRate);
  return (
    <div className="mt-2">
      <div
        className={clsx(
          'w-full h-5 rounded-full',
          'pr-2',
          'text-xs font-bold',
          'bg-[#988FD3]',
          'flex justify-end items-center'
        )}
      >
        {props.barProps?.target}
      </div>
      <div
        className={clsx(
          'h-5 rounded-full',
          'pr-2',
          'text-xs font-bold',
          colorClass,
          'flex justify-end items-center',
          '-mt-5'
        )}
        style={{
          width: `${barWidth}%`,
        }}
      >
        {props.barProps?.current}
      </div>
    </div>
  );
}

function StateCount(props: PropsWithChildren<StateItemProps>) {
  const colorClass = healthColorClass(props.countProps?.value);
  return (
    <div className={clsx('w-2/12', 'flex justify-end')}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'text-xs font-bold',
          'h-8 w-8 overflow-hidden',
          'rounded-full',
          colorClass
        )}
      >
        {props.countProps?.value}
      </div>
    </div>
  );
}

function StateDeath(props: PropsWithChildren<StateItemProps>) {
  return (
    <div className={clsx('w-2/12', 'flex justify-end')}>
      <div
        className={clsx(
          'flex items-center justify-center',
          'text-xs font-bold',
          'h-8 w-8 overflow-hidden',
          'bg-white',
          'rounded-tl-lg rounded-tr-lg'
        )}
      >
        {props.deathProps?.daysLeft}
      </div>
    </div>
  );
}

function StateItem(props: PropsWithChildren<StateItemProps>) {
  const Icon = props.icon;
  return (
    <div className={props.containerClassName || ''}>
      <div className={clsx('flex items-start')}>
        <div className="w-6 shrink-0">
          <Icon />
        </div>
        <div
          className={clsx(
            'ml-1',
            { 'w-9/12': props.itemType !== 'bar' },
            { 'w-11/12': props.itemType === 'bar' }
          )}
        >
          <h3 className={clsx('text-md', 'mb-1', 'font-bold')}>{props.id}</h3>
          <p className={clsx('opacity-60 text-sm', 'w-10/12')}>
            {props.description}
          </p>
          {props.itemType === 'bar' && <StateBar {...props} />}
        </div>
        {props.itemType === 'count' && <StateCount {...props} />}

        {props.itemType === 'death' && <StateDeath {...props} />}
      </div>
    </div>
  );
}

export { BoltIcon, HeartIcon, TimeIcon, SpaceIcon, FireIcon, EyeIcon };
export default StateItem;
