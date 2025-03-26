import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentItem } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/lib/toast";

export const Contact: React.FC = () => {
  const { item: titleItem, isLoading: titleLoading } = useContentItem('contactTitle');
  const { item: descriptionItem, isLoading: descriptionLoading } = useContentItem('contactDescription');
  const { item: emailItem, isLoading: emailLoading } = useContentItem('contactEmail');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isLoading = titleLoading || descriptionLoading || emailLoading;
  
  const title = titleItem?.value || 'Get In Touch';
  const description = descriptionItem?.value || "I'm always open to new opportunities and collaborations";
  const email = emailItem?.value || 'hello@example.com';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast.success("Message sent successfully!");
    }, 1000);
  };
  
  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16 appear"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm tracking-wider uppercase text-gray-500 mb-2 font-medium">
            Contact
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
            {isLoading ? (
              <div className="h-12 w-1/2 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
            ) : (
              title
            )}
          </h2>
          
          <p className="text-gray-600 text-lg">
            {isLoading ? (
              <div className="h-8 w-3/4 mx-auto bg-gray-200 animate-pulse rounded-md"></div>
            ) : (
              description
            )}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            className="appear"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <a 
                    href={`mailto:${email}`} 
                    className="text-lg text-gray-800 hover:text-accent transition-colors"
                  >
                    {email}
                  </a>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="text-gray-800">San Francisco, CA</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-2">Social</div>
                  <div className="flex space-x-5">
                    {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((platform) => (
                      <a 
                        key={platform}
                        href="#" 
                        className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="appear"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm text-gray-500 mb-1 block">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full p-3 rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm text-gray-500 mb-1 block">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="w-full p-3 rounded-lg"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm text-gray-500 mb-1 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="w-full p-3 rounded-lg min-h-[120px]"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
