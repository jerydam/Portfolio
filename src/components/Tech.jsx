import React, { lazy, Suspense } from "react";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const BallCanvas = lazy(() => import("./canvas/Ball"));

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <Suspense fallback={null}>
            <BallCanvas icon={technology.icon} />
          </Suspense>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
