
import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNavigation = false, 
  hideFooter = false 
}) => {
  const location = useLocation();
  
  // Function to handle scroll animations
  useEffect(() => {
    const appearElements = document.querySelectorAll('.appear');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    appearElements.forEach(element => {
      observer.observe(element);
    });
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    return () => {
      appearElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [location.pathname]);
  
  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavigation && <Navigation />}
      
      <motion.main 
        className="flex-grow"
        variants={pageTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={location.pathname}
      >
        {children}
      </motion.main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
