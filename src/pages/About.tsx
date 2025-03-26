
import React from 'react';
import { Layout } from '@/components/Layout';
import { About as AboutSection } from '@/components/About';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <AboutSection />
      </div>
    </Layout>
  );
};

export default About;
