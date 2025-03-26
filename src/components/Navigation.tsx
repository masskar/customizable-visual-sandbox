
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/lib/toast';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useIsMobile();
  
  // Check login status on component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when navigating on mobile
  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/" className="text-2xl font-display font-medium">
              Portfolio
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <motion.nav 
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <ul className="flex space-x-10">
              {['home', 'about', 'work', 'contact'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  <Link 
                    to={item === 'home' ? '/' : `/${item}`} 
                    className="text-gray-800 hover:text-accent text-sm uppercase tracking-wide font-medium animated-underline"
                    onClick={handleNavClick}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoggedIn ? (
                  <div className="flex space-x-2">
                    <Button 
                      asChild
                      variant="ghost"
                      className="text-sm uppercase tracking-wide font-medium"
                    >
                      <Link to="/admin">Admin</Link>
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="text-sm uppercase tracking-wide font-medium"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-sm uppercase tracking-wide font-medium"
                  >
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                )}
              </motion.li>
            </ul>
          </motion.nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-white glass-dark pt-24"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto px-6">
              <ul className="flex flex-col space-y-6 items-center">
                {['home', 'about', 'work', 'contact'].map((item, index) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={item === 'home' ? '/' : `/${item}`} 
                      className="text-gray-800 text-xl uppercase tracking-wide font-medium"
                      onClick={handleNavClick}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoggedIn ? (
                    <div className="flex flex-col space-y-4 items-center">
                      <Link 
                        to="/admin" 
                        className="text-gray-800 text-xl uppercase tracking-wide font-medium"
                        onClick={handleNavClick}
                      >
                        Admin
                      </Link>
                      <Button 
                        variant="outline"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      asChild
                      size="lg"
                      className="flex items-center"
                      onClick={handleNavClick}
                    >
                      <Link to="/login">
                        <LogIn className="mr-2 h-5 w-5" />
                        Login
                      </Link>
                    </Button>
                  )}
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
