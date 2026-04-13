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
  I'm Oyeniran Jeremiah Damilare — a full-stack Web3 developer, smart contract engineer, and Co-founder of FaucetDrops, an automated on-chain engagement and reward distribution platform live across Celo, Base, BNB Chain, Lisk, and Arbitrum.

  I specialize in building end-to-end blockchain products that are not just functional, but usable. My stack spans Python (FastAPI) and Supabase for backend systems, Next.js and TypeScript for frontend development, and Solidity with Foundry for secure smart contract engineering. I actively work with tools like Web3.py, Ethers.js, Wagmi, to deliver seamless onboarding experiences, embedded wallets, and frictionless multi-chain interactions that make Web3 products feel as intuitive as Web2.

  Beyond FaucetDrops, I've designed and shipped multiple real-world blockchain solutions — including HealFi (a healthcare-focused DeFi platform), ContriBoost (a decentralized group savings and fundraising protocol), ClimaLink (a climate-reporting DAO), and a multisig wallet system on Base. My work consistently focuses on solving practical problems using decentralized infrastructure.

  I'm deeply involved in the Web3 ecosystem — contributing to open-source projects, participating in global hackathons, and building within communities like Celo, StarkNet, and Base. I'm currently expanding my expertise into Rust, with a focus on high-performance blockchain infrastructure and protocol-level development.

  Currently pursuing a B.Sc. in Computer Science at LAUTECH (2023–2027), I’m passionate about building in public, sharing knowledge, and driving adoption of blockchain technology through education, community, and impactful products.

  I'm always open to collaborating on ambitious ideas and exploring opportunities where blockchain meets real-world utility.
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