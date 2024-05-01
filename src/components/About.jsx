import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
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
        <img
          src={icon}
          alt='web-development'
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
          👋 Hello there! I'm Oyeniran Jeremiah Damilare, a dynamic Front-End Developer and Smart Contract Engineer driven by a relentless passion for technology and innovation. With a diploma in Computer Engineering from The Polytechnic Ibadan, I've honed my skills to craft immersive digital experiences that seamlessly blend the worlds of web development and blockchain technology.

💡 My journey began with mastering the core languages of the web - HTML, CSS, and JavaScript. As I delved deeper, I embraced cutting-edge frameworks like React and Next.js, alongside design tools like Figma, to sculpt captivating user interfaces that captivate and engage audiences.

🔗 But my fascination with technology didn't stop there. I ventured into the realm of blockchain, where I found my calling in Smart Contract Development. Armed with expertise in Solidity, Ethereum, and beyond, I architect decentralized solutions that redefine possibilities. From concept to execution, I thrive on transforming innovative ideas into tangible realities that reshape industries.

🚀 Whether it's crafting responsive web experiences that elevate user engagement or architecting decentralized applications poised to disrupt traditional paradigms, I'm fueled by a relentless pursuit of excellence. With a keen eye for detail and a penchant for pushing boundaries, I'm committed to pushing the envelope of what's possible in the digital landscape.

💼 Are you ready to embark on a journey of digital transformation? Let's collaborate and build the future together, one line of code at a time.
    </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
