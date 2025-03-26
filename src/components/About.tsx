
import React from 'react';
import { motion } from 'framer-motion';
import { useContentItem } from '@/contexts/ContentContext';

export const About: React.FC = () => {
  const { item: titleItem, isLoading: titleLoading } = useContentItem('aboutTitle');
  const { item: descriptionItem, isLoading: descriptionLoading } = useContentItem('aboutDescription');
  const { item: imageItem, isLoading: imageLoading } = useContentItem('aboutImage');
  
  const isLoading = titleLoading || descriptionLoading || imageLoading;
  
  const title = titleItem?.value || 'About Me';
  const description = descriptionItem?.value || 'I'm a passionate designer and developer with over 5 years of experience creating beautiful, functional interfaces.';
  const image = imageItem?.value || '/placeholder.svg';
  
  return (
    <section id="about" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="appear"
          >
            {isLoading ? (
              <div className="h-64 md:h-80 lg:h-96 w-full bg-gray-200 animate-pulse rounded-2xl"></div>
            ) : (
              <img 
                src={image} 
                alt="About Me" 
                className="w-full h-auto rounded-2xl shadow-md object-cover aspect-[3/4]"
              />
            )}
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="appear"
          >
            <div className="text-sm tracking-wider uppercase text-gray-500 mb-2 font-medium">
              My story
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-8">
              {isLoading ? (
                <div className="h-12 w-2/3 bg-gray-200 animate-pulse rounded-md"></div>
              ) : (
                title
              )}
            </h2>
            
            {isLoading ? (
              <>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md mb-4"></div>
                <div className="h-4 w-4/5 bg-gray-200 animate-pulse rounded-md"></div>
              </>
            ) : (
              <div 
                className="text-gray-600 prose prose-lg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Design', 'Development', 'Animation', 'UI/UX', 'Branding', 'Strategy'].map((skill, index) => (
                <motion.div 
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-4 bg-white rounded-lg shadow-sm text-center"
                >
                  <div className="text-gray-800 font-medium">{skill}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
