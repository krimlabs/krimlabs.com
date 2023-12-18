import clsx from "clsx";

import Spotlight from "@src/components/Spotlight";

function Index() {
  return (
    <div className={clsx("flex")}>
      <aside className={clsx("w-4/12", "p-4")}>
        <Spotlight />
      </aside>
      <main className={clsx("w-8/12", "p-4")}>Content</main>
    </div>
  );
}

export default Index;
