
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div 
            className="appear"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-2xl font-display font-medium mb-4 block">
              Portfolio
            </Link>
            <p className="text-gray-600 text-sm mt-4 max-w-xs">
              A minimalist portfolio template designed with elegance and precision.
            </p>
          </motion.div>
          
          {/* Links */}
          <motion.div 
            className="appear"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-md font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Work', 'Contact'].map((item, index) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/#${item.toLowerCase()}`} 
                    className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/admin" 
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div 
            className="appear"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-md font-medium mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">
              hello@example.com
            </p>
            <div className="flex space-x-4 mt-4">
              {['Twitter', 'Instagram', 'GitHub'].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
