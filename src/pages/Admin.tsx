
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ContentEditor } from '@/components/ContentEditor';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('Please login to access the admin area');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="mb-4"
            >
              <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to site
                </Link>
              </motion.div>
            </Button>
            
            <h1 className="text-3xl font-display font-medium mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage and customize your portfolio content</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <ContentEditor />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Admin;
