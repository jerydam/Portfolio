import React from "react";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { projects } from "../data/projects";
import Tilt from "./Tilt";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 0.15}s` }}
      className={`reveal reveal-up ${isVisible ? "reveal-visible" : ""}`}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          {image ? (
            <img
              src={image}
              alt='project_image'
              loading='lazy'
              className='w-full h-full object-cover rounded-2xl'
            />
          ) : (
            <div className='w-full h-full bg-black-200 rounded-2xl flex justify-center items-center text-white'>
              No Image Preview
            </div>
          )}

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-2'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                width={20}
                height={20}
                loading='lazy'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
                className='bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px] line-clamp-3'>
            {description}
          </p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>

      <div className='w-full flex'>
        <p className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
          A few things I've shipped in the Web3 space - spanning on-chain
          reward distribution, embedded wallet infrastructure, ZK identity,
          and decentralized savings protocols.
        </p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>

      <div className='mt-10 flex justify-center'>
        <a
          href="https://github.com/jerydam"
          target="_blank"
          rel="noopener noreferrer"
          className='bg-[#915EFF] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 transform'
        >
          See More Projects on GitHub
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
