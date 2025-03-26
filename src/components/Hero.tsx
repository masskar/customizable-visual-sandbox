
import React from 'react';
import { motion } from 'framer-motion';
import { useContentItem } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { item: titleItem, isLoading: titleLoading } = useContentItem('heroTitle');
  const { item: subtitleItem, isLoading: subtitleLoading } = useContentItem('heroSubtitle');
  const { item: imageItem, isLoading: imageLoading } = useContentItem('heroImage');
  
  const isLoading = titleLoading || subtitleLoading || imageLoading;
  
  const title = titleItem?.value || "Hello, I'm a Designer & Developer";
  const subtitle = subtitleItem?.value || 'Crafting digital experiences with elegance and purpose';
  const image = imageItem?.value || '/placeholder.svg';
  
  return (
    <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6">
              {isLoading ? (
                <div className="h-20 w-full bg-gray-100 animate-pulse rounded-md"></div>
              ) : (
                title
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              {isLoading ? (
                <div className="h-16 w-full bg-gray-100 animate-pulse rounded-md"></div>
              ) : (
                subtitle
              )}
            </p>
            
            <div className="flex space-x-4">
              <Button 
                asChild
                className="px-8 py-6 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
              >
                <a href="#work">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="px-8 py-6 rounded-full border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                <a href="#contact">
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {isLoading ? (
              <div className="h-64 md:h-80 lg:h-96 w-full bg-gray-100 animate-pulse rounded-2xl"></div>
            ) : (
              <img 
                src={image} 
                alt="Hero" 
                className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-[4/3]"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
