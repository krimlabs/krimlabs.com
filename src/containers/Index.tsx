import clsx from "clsx";
import React from "react";

import Spotlight from "@src/components/Spotlight";
import Timeline from '@src/components/Timeline';
import About from '@src/components/About';
import Nav from '@src/components/Nav';

function Index() {
  return (
    <div className={clsx('w-11/12 mx-auto lg:w-8/12 xl:w-6/12', 'mt-8')}>
      <Nav />
      <div className={clsx('flex flex-col md:flex-row', 'mt-8')}>
        <aside className={clsx('w-full md:w-[320px] flex-shrink-0', 'pr-4')}>
          <Spotlight />
        </aside>
        <main
          className={clsx(
            'flex-grow',
            'break-words',
            'md:p-4'
            //"border border-red-800",
          )}
        >
          <About />
          <Timeline />
        </main>
      </div>
    </div>
  );
}

export default Index;
