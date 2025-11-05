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
  live_demo_link,
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

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-2'>
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
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const githubUsername = 'jerydam';
  
  // Helper function to extract description from README content
  const extractDescriptionFromReadme = (readmeContent) => {
    if (!readmeContent) return 'No description available.';
    
    // Decode base64 content
    const decodedContent = atob(readmeContent);
    
    // Remove common markdown elements and clean up
    let cleanContent = decodedContent
      // Remove headers
      .replace(/#{1,6}\s.*$/gm, '')
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      // Remove HTML tags
      .replace(/<[^>]*>/g, '')
      // Remove badges (shields.io, etc.)
      .replace(/!\[.*?\]\(.*?shields\.io.*?\)/g, '')
      // Remove horizontal rules
      .replace(/---+|___+|\*\*\*+/g, '')
      // Remove bullet points and numbering
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      // Remove extra whitespace and newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Get the first meaningful paragraph (skip empty lines)
    const paragraphs = cleanContent.split('\n').filter(p => p.trim().length > 20);
    
    if (paragraphs.length === 0) {
      return 'No description available.';
    }
    
    // Get first 1-2 paragraphs or up to 200 characters
    let description = paragraphs[0];
    if (description.length < 100 && paragraphs[1]) {
      description += ' ' + paragraphs[1];
    }
    
    // Truncate if too long
    if (description.length > 200) {
      description = description.substring(0, 197) + '...';
    }
    
    return description;
  };

  // Helper function to fetch README for a repository
  const fetchReadme = async (repoName) => {
    try {
      // Try to fetch README (GitHub API automatically finds README.md, readme.md, etc.)
      const readmeRes = await fetch(
        `https://api.github.com/repos/${githubUsername}/${repoName}/readme`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      
      if (readmeRes.ok) {
        const readmeData = await readmeRes.json();
        return extractDescriptionFromReadme(readmeData.content);
      }
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error);
    }
    return null;
  };

  // Helper function to fetch repository topics/tags
  const fetchRepoTopics = async (repoName) => {
    try {
      const topicsRes = await fetch(
        `https://api.github.com/repos/${githubUsername}/${repoName}/topics`,
        {
          headers: {
            'Accept': 'application/vnd.github.mercy-preview+json'
          }
        }
      );
      
      if (topicsRes.ok) {
        const topicsData = await topicsRes.json();
        return topicsData.names || [];
      }
    } catch (error) {
      console.error(`Error fetching topics for ${repoName}:`, error);
    }
    return [];
  };

  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch repositories
        const res = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=pushed&direction=desc&per_page=9`
        );
        const repos = await res.json();
        
        // Filter out forks
        const nonForkedRepos = repos.filter(repo => !repo.fork);
        
        // Fetch README and topics for each repo in parallel
        const projectPromises = nonForkedRepos.slice(0, 6).map(async (repo) => {
          const [readmeDescription, topics] = await Promise.all([
            fetchReadme(repo.name),
            fetchRepoTopics(repo.name)
          ]);
          
          // Create tags based on language and topics
          const tags = [];
          
          // Add primary language
          if (repo.language) {
            tags.push({ 
              name: repo.language, 
              color: 'blue-text-gradient' 
            });
          }
          
          // Add up to 2 topics
          topics.slice(0, 2).forEach(topic => {
            tags.push({ 
              name: topic, 
              color: 'green-text-gradient' 
            });
          });
          
          // If no tags yet, add default
          if (tags.length === 0) {
            tags.push({ 
              name: 'Repository', 
              color: 'pink-text-gradient' 
            });
          }
          
          // Determine if there's a live demo (GitHub Pages or homepage)
          const live_demo_link = repo.homepage || 
            (repo.has_pages ? `https://${githubUsername}.github.io/${repo.name}/` : null);

          return {
            name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: readmeDescription || repo.description || 'No description available.',
            source_code_link: repo.html_url,
            live_demo_link: live_demo_link,
            image: null, // You can add logic to fetch images from README if needed
            tags: tags,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          };
        });
        
        const formattedProjects = await Promise.all(projectPromises);
        setProjects(formattedProjects);
        
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      } finally {
        setLoading(false);
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
          real-world examples of my work. Each project is 
          dynamically pulled from my github, ensuring accuracy and relevance.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {loading ? (
          <div className="w-full flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-2xl bg-tertiary h-96 w-80"></div>
              <div className="rounded-2xl bg-tertiary h-96 w-80"></div>
              <div className="rounded-2xl bg-tertiary h-96 w-80"></div>
            </div>
          </div>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        )}
      </div>
      
      <div className='mt-10 flex justify-center'>
        <a 
          href={`https://github.com/${githubUsername}`}
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

export default SectionWrapper(Works, "");