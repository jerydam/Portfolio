import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { supabase, iconMap } from "../supabaseClient"; // 👈 New import
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        {/* 'icon' is now the resolved image path */}
        <img
          src={icon} 
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [services, setServices] = useState([]); // 👈 State for services

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*');

      if (error) {
        console.error('Error fetching services:', error);
      } else {
        // Map the icon_url (string) to the actual imported asset
        const mappedServices = data.map(service => ({
          ...service,
          icon: iconMap[service.icon_url] || service.icon_url 
        }));
        setServices(mappedServices);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
       👋 Hello there! I'm Oyeniran Jeremiah Damilare, a dynamic Front-End Developer and Smart Contract Engineer driven by a relentless passion for technology and innovation. With a Diploma in Computer Engineering from The Polytechnic Ibadan, I’ve cultivated a strong technical foundation and expanded it through continuous learning and hands-on experience.

🎓 My educational journey reflects my commitment to growth and excellence:

Ladoke Akintola University of Technology (LAUTECH) — B.Sc. in Computer Science (2023–2027)

SQI College of ICT — Software Engineering (2020–2022)

The Polytechnic Ibadan — Diploma in Computer Engineering (2017–2019)

💡 My path began with mastering the core languages of the web — HTML, CSS, and JavaScript. As I evolved, I embraced frameworks and tools like React, Next.js, Tailwind CSS, Figma, and Web3Modal to craft intuitive and captivating user interfaces that connect people seamlessly to Web3 experiences.

🔗 My fascination with technology led me into blockchain development, where I found purpose in building decentralized solutions that redefine what’s possible. Equipped with Solidity, Foundry, Ethers.js, and PostgreSQL, I design and deploy secure and efficient smart contracts across Ethereum, Kaia (Klaytn), and Flare Network. My work explores Account Abstraction, FTSO price feeds, and cross-chain interoperability, pushing the limits of decentralized innovation.

🚀 Whether I’m developing responsive front-end experiences, architecting blockchain protocols, or bridging real-world applications into Web3, I’m driven by creativity, precision, and a desire to make lasting impact. With every project, I strive to deliver solutions that are not only functional but transformative.

💼 Are you ready to embark on a journey of digital transformation? Let’s collaborate and build the future together — one line of code at a time.
    </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {/* Render dynamic services */}
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");