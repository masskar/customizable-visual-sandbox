
import React from 'react';
import { motion } from 'framer-motion';
import { useContentItem } from '@/contexts/ContentContext';
import { ArrowUpRight } from 'lucide-react';

// Demo project data (would normally come from the backend)
const projects = [
  {
    id: 1,
    title: 'Minimalist E-Commerce',
    category: 'UI Design & Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    link: '#'
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'Branding & Strategy',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    link: '#'
  },
  {
    id: 3,
    title: 'Mobile App Interface',
    category: 'UI/UX & Development',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    link: '#'
  },
  {
    id: 4,
    title: 'Design System',
    category: 'UI Components & Documentation',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    link: '#'
  }
];

export const Projects: React.FC = () => {
  const { item: titleItem, isLoading: titleLoading } = useContentItem('projectsTitle');
  const { item: descriptionItem, isLoading: descriptionLoading } = useContentItem('projectsDescription');
  
  const isLoading = titleLoading || descriptionLoading;
  
  const title = titleItem?.value || 'Selected Work';
  const description = descriptionItem?.value || 'A collection of projects that showcase my skills and passion';
  
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16 md:mb-24 appear"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm tracking-wider uppercase text-gray-500 mb-2 font-medium">
            Portfolio
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
            {isLoading ? (
              <div className="h-12 w-1/2 mx-auto bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              title
            )}
          </h2>
          
          <p className="text-gray-600 text-lg">
            {isLoading ? (
              <div className="h-8 w-3/4 mx-auto bg-gray-100 animate-pulse rounded-md"></div>
            ) : (
              description
            )}
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="group relative rounded-2xl overflow-hidden shadow-md appear"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <a href={project.link} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="text-sm text-gray-500 mb-2">{project.category}</div>
                  <h3 className="text-xl font-display font-medium group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
