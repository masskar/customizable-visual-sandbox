
import React from 'react';
import { Layout } from '@/components/Layout';
import { ContentEditor } from '@/components/ContentEditor';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="mb-4"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to site
            </Link>
          </Button>
          
          <h1 className="text-3xl font-display font-medium mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and customize your portfolio content</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <ContentEditor />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
