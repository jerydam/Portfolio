import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Smart contract Developer",
    icon: web,
  },
  {
    title: "Blockchain Engineer",
    icon: mobile,
  },
  {
    title: "Front End Developer",
    icon: backend,
  },
  {
    title: "Website Design",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Frontend Development",
    company_name: "SQI College of ICT",
    icon: starbucks,
    iconBg: "#383E56",
    date: "January 2021 - May 2022",
    points: [
      "Learning to Develop and maintaining web applications using React.js, Next.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Smart Contract Development",
    company_name: "Web3bridge",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - May 2023",
    points: [
      "Developing and maintaining Decentralised applications using Solidity and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Blockchain Engineering",
    company_name: "Learning",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2023 - Till date",
    points: [
      "Venturing into the realm of blockchain with zero knowledge but boundless curiosity! As I embark on this exciting journey to become a Blockchain Engineer, I'm driven by an insatiable hunger to learn. From unraveling the intricacies of smart contracts to navigating the complexities of decentralized applications, I'm eager to chart new territories in the world of blockchain technology. Join me as I embrace the challenge of mastering the unknown and unlocking the potential of tomorrow's digital landscape.",
    ],
  },
  {
    title: "Web Development",
    company_name: "SwiftConnect",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "November 2021 - Present",
    points: [
      "Developing and maintaining web applications wordpress and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but He proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    testimonial:
      "I've never met a Hard working and Determined person who truly cares about their work like Jery does.",
    name: "Abiola O. Caleb",
    designation: "CEO",
    company: "Swiftconnect Affair NG",
    image: "https://swiftconnect.com.ng/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-06-at-8.28.07-AM-150x150.jpeg",
  },
  {
    testimonial:
      "When come to puntuality and quality work Jerydam has it all, fast delivery and good customer relation",
    name: "Olutoye T. Abiodun",
    designation: "Digital Markerter",
    company: "Falsetto Bright LTD",
    image: "https://swiftconnect.com.ng/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-06-at-9.37.50-AM-e1641491159697-150x150.jpeg",
  },
];

const projects = [
  {
    name: "MetaSqare",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "NextJs",
        color: "blue-text-gradient",
      },
      {
        name: "Solidity",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/jerydam/MetaSquare",
  },
  {
    name: "Staking dApp",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "solidity",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/jerydam/StakingDapp",
  },
  {
    name: "NFT dApp",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "solidity",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/jerydam/NftDapp",
  },
];

export { services, technologies, experiences, testimonials, projects };
