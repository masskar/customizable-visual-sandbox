
import React from 'react';
import { Layout } from '@/components/Layout';
import { Projects } from '@/components/Projects';

const Work: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <Projects />
      </div>
    </Layout>
  );
};

export default Work;
