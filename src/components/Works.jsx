import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image, 
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          {/* Image source needs to be manually added or fetched from another source */}
          {image ? (
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
          ) : (
            <div className='w-full h-full bg-black-200 rounded-2xl flex justify-center items-center text-white'>
              No Image Preview
            </div>
          )}

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
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
    </motion.div>
  );
};
  
const Works = () => {
  const [projects, setProjects] = useState([]);
  const githubUsername = 'jerydam';
  
  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        // Fetch up to 6 of the most recently pushed (updated) repositories
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&direction=desc&per_page=6`);
        const data = await res.json();
        
        const formattedProjects = data
          // MODIFIED FILTER: Only exclude forks. A null description is now allowed.
          .filter(repo => repo.fork === false) 
          .map(repo => {
            const tags = [
              { name: repo.language || 'Code', color: 'blue-text-gradient' },
              { name: 'Repo', color: 'pink-text-gradient' }
            ];

            return {
              name: repo.name,
              description: repo.description || 'No description available.', // Provide a fallback description
              source_code_link: repo.html_url,
              image: null, 
              tags: tags,
            };
          });
        
        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      }
    };

    fetchGithubProjects();
  }, []); 

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. This list is dynamically pulled 
          from my GitHub profile, ensuring it's always current.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {/* Render dynamic projects */}
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      
      {/* 🚀 New "See More" Button Section */}
      <div className='mt-10 flex justify-center'>
        <a 
          href="https://github.com/jerydam" 
          className='bg-[#915EFF] text-white font-bold py-3 px-8 rounded-xl shadow-md transition duration-300 ease-in-out hover:bg-opacity-90'
        >
          See more projects
        </a>
      </div>
      {/* 🚀 End New Section */}
    </>
  );
};

export default SectionWrapper(Works, "");