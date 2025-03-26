
import React from 'react';
import { Layout } from '@/components/Layout';
import { Contact as ContactSection } from '@/components/Contact';

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <ContactSection />
      </div>
    </Layout>
  );
};

export default Contact;
