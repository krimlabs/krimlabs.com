import clsx from "clsx";

import Spotlight from "@src/components/Spotlight";
import Timeline from '@src/components/Timeline';
import About from '@src/components/About';

function Index({ timelineItems }) {
  return (
    <div
      className={clsx(
        'flex flex-col md:flex-row',
        'w-11/12 mx-auto lg:w-8/12 xl:w-6/12'
        // "border",
      )}
    >
      <aside className={clsx('w-full md:w-[320px] flex-shrink-0', 'p-4')}>
        <Spotlight />
      </aside>
      <main
        className={clsx(
          'flex-grow',
          'break-words',
          'p-4'
          //"border border-red-800",
        )}
      >
        <About />
        <Timeline timelineItems={timelineItems} />
      </main>
    </div>
  );
}

export default Index;
