import clsx from "clsx";

import Spotlight from "@src/components/Spotlight";

function Index() {
  return (
    <div
      className={clsx("flex", "w-11/12 mx-auto md:w-10/12 lg:w-8/12 xl:w-6/12")}
    >
      <aside className={clsx("w-[320px]", "p-4")}>
        <Spotlight />
      </aside>
      <main className={clsx("flex-grow", "p-4")}>Content</main>
    </div>
  );
}

export default Index;
