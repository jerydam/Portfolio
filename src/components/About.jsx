import React from "react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Tilt from "./Tilt";

const ServiceCard = ({ index, title, icon }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <Tilt className='xs:w-[250px] w-full'>
      <div
        ref={ref}
        style={{ transitionDelay: `${index * 0.15}s` }}
        className={`w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card reveal reveal-right ${
          isVisible ? "reveal-visible" : ""
        }`}
      >
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img
            src={icon}
            alt={title}
            width={64}
            height={64}
            loading='lazy'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </div>

      <p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        I'm Oyeniran Jeremiah Damilare — a full-stack Web3 developer and
        co-founder of FaucetDrops, focused on building frictionless
        on-chain UX. I'm currently open to Developer Relations and
        protocol engineering roles.
        <br />
        <br />
        Find my work on GitHub at{" "}
        <a
          href='https://github.com/jerydam'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white underline hover:text-[#915EFF]'
        >
          github.com/jerydam
        </a>
        .
      </p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
