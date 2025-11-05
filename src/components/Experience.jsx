import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { supabase, iconMap } from "../supabaseClient"; // 👈 New import
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  // Ensure points is handled as an array (Supabase can store it as `text[]`)
  const pointsArray = Array.isArray(experience.points) ? experience.points : [experience.points];

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          {/* 'icon' is the resolved image path */}
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {/* Map through the dynamic points array */}
        {pointsArray.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]); // 👈 State for experiences

  useEffect(() => {
    async function fetchExperiences() {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: false }); // Optional: Order by ID or date

      if (error) {
        console.error('Error fetching experiences:', error);
      } else {
        // Map the icon_url (string) to the actual imported asset
        const mappedExperiences = data.map(exp => ({
          ...exp,
          icon: iconMap[exp.icon_url] || exp.icon_url 
        }));
        setExperiences(mappedExperiences);
      }
    }
    fetchExperiences();
  }, []);
  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {/* Render dynamic experiences */}
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");