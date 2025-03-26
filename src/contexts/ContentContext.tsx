
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Define types for content
export interface ContentItem {
  id: string;
  key: string;
  type: 'text' | 'image' | 'richText';
  value: string;
  label: string;
  section: string;
}

export interface ContentSections {
  [key: string]: ContentItem[];
}

interface ContentContextType {
  content: ContentSections;
  isLoading: boolean;
  error: string | null;
  updateContent: (item: ContentItem) => Promise<void>;
  revertToDefault: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Default content as fallback
const defaultContent: ContentSections = {
  hero: [
    { id: '1', key: 'heroTitle', type: 'text', value: 'Hello, I'm a Designer & Developer', label: 'Hero Title', section: 'hero' },
    { id: '2', key: 'heroSubtitle', type: 'text', value: 'Crafting digital experiences with elegance and purpose', label: 'Hero Subtitle', section: 'hero' },
    { id: '3', key: 'heroImage', type: 'image', value: '/placeholder.svg', label: 'Hero Image', section: 'hero' },
  ],
  about: [
    { id: '4', key: 'aboutTitle', type: 'text', value: 'About Me', label: 'About Title', section: 'about' },
    { id: '5', key: 'aboutDescription', type: 'richText', value: "I'm a passionate designer and developer with over 5 years of experience creating beautiful, functional interfaces. My approach combines technical precision with creative vision to build experiences that are both aesthetically pleasing and highly usable. I believe in minimalist design that puts content and user experience first.", label: 'About Description', section: 'about' },
    { id: '6', key: 'aboutImage', type: 'image', value: '/placeholder.svg', label: 'About Image', section: 'about' },
  ],
  projects: [
    { id: '7', key: 'projectsTitle', type: 'text', value: 'Selected Work', label: 'Projects Title', section: 'projects' },
    { id: '8', key: 'projectsDescription', type: 'text', value: 'A collection of projects that showcase my skills and passion', label: 'Projects Description', section: 'projects' },
  ],
  contact: [
    { id: '9', key: 'contactTitle', type: 'text', value: 'Get In Touch', label: 'Contact Title', section: 'contact' },
    { id: '10', key: 'contactDescription', type: 'text', value: "I'm always open to new opportunities and collaborations", label: 'Contact Description', section: 'contact' },
    { id: '11', key: 'contactEmail', type: 'text', value: 'hello@example.com', label: 'Contact Email', section: 'contact' },
  ],
};

// Helper to simulate API calls in local storage
const LOCAL_STORAGE_KEY = 'portfolio-content';

async function fetchContent(): Promise<ContentSections> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedContent) {
        resolve(JSON.parse(savedContent));
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultContent));
        resolve(defaultContent);
      }
    }, 500);
  });
}

async function saveContent(content: ContentSections): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
      resolve();
    }, 500);
  });
}

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentSections>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const data = await fetchContent();
        setContent(data);
        setError(null);
      } catch (err) {
        setError('Failed to load content');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Update content item
  const updateContent = async (item: ContentItem) => {
    try {
      setIsLoading(true);
      
      // Update the content in state
      const updatedContent = { ...content };
      
      if (!updatedContent[item.section]) {
        updatedContent[item.section] = [];
      }
      
      const itemIndex = updatedContent[item.section].findIndex(
        (i) => i.id === item.id
      );
      
      if (itemIndex >= 0) {
        updatedContent[item.section][itemIndex] = item;
      } else {
        updatedContent[item.section].push(item);
      }
      
      // Save to storage
      await saveContent(updatedContent);
      setContent(updatedContent);
      toast.success("Content updated successfully");
    } catch (err) {
      setError('Failed to update content');
      toast.error("Failed to update content");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to default content
  const revertToDefault = async () => {
    try {
      setIsLoading(true);
      await saveContent(defaultContent);
      setContent(defaultContent);
      toast.success("Content reset to default");
    } catch (err) {
      setError('Failed to reset content');
      toast.error("Failed to reset content");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        error,
        updateContent,
        revertToDefault,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Helper function to get a specific content item by key
export const useContentItem = (key: string) => {
  const { content, isLoading } = useContent();
  
  // Find the item in any section
  const item = Object.values(content)
    .flat()
    .find((item) => item.key === key);
  
  return { item, isLoading };
};

// Helper function to get all items in a section
export const useContentSection = (section: string) => {
  const { content, isLoading } = useContent();
  
  const sectionItems = content[section] || [];
  
  return { items: sectionItems, isLoading };
};
