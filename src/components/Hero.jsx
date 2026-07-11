import { lazy, Suspense } from "react";

import { styles } from "../styles";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto bg-black">
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I am <span className='text-[#915EFF]'>Jeremiah Oyeniran</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            a Blockchain Developer </p>
        </div>
      </div>

      <Suspense fallback={null}>
        <ComputersCanvas />
      </Suspense>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <div className='w-3 h-3 rounded-full bg-secondary mb-1 bounce-dot' />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
