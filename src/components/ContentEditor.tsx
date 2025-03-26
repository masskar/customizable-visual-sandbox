
import React, { useState } from 'react';
import { 
  ContentItem, 
  ContentSections, 
  useContent
} from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from "@/components/ui/sonner";
import { Loader2, Save, RefreshCw } from 'lucide-react';

export const ContentEditor: React.FC = () => {
  const { content, isLoading, updateContent, revertToDefault } = useContent();
  const [editedContent, setEditedContent] = useState<ContentSections>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  
  // Initialize edited content when content loads
  React.useEffect(() => {
    if (!isLoading && Object.keys(content).length > 0) {
      setEditedContent(JSON.parse(JSON.stringify(content)));
    }
  }, [content, isLoading]);

  // Handle content changes
  const handleContentChange = (sectionKey: string, itemKey: string, value: string) => {
    setEditedContent(prev => {
      const newContent = { ...prev };
      
      if (!newContent[sectionKey]) {
        return prev;
      }
      
      const itemIndex = newContent[sectionKey].findIndex(
        item => item.key === itemKey
      );
      
      if (itemIndex === -1) {
        return prev;
      }
      
      newContent[sectionKey][itemIndex] = {
        ...newContent[sectionKey][itemIndex],
        value
      };
      
      return newContent;
    });
  };

  // Handle save
  const handleSave = async (section: string) => {
    if (!editedContent[section]) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save each item in the section
      for (const item of editedContent[section]) {
        await updateContent(item);
      }
      
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} section updated successfully`);
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle revert to default
  const handleRevert = async () => {
    if (window.confirm("Are you sure you want to revert all content to defaults? This action cannot be undone.")) {
      setIsReverting(true);
      
      try {
        await revertToDefault();
        toast.success("Content restored to default");
      } catch (error) {
        console.error("Error reverting content:", error);
        toast.error("Failed to revert content");
      } finally {
        setIsReverting(false);
      }
    }
  };

  // Render loading state
  if (isLoading || Object.keys(editedContent).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Render form for each content item
  const renderContentForm = (item: ContentItem, section: string) => {
    const value = editedContent[section]?.find(i => i.key === item.key)?.value || '';
    
    switch (item.type) {
      case 'text':
        return (
          <Input
            value={value}
            onChange={(e) => handleContentChange(section, item.key, e.target.value)}
            className="w-full"
          />
        );
      case 'richText':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleContentChange(section, item.key, e.target.value)}
            className="w-full min-h-[200px]"
          />
        );
      case 'image':
        return (
          <div className="space-y-3">
            <Input
              value={value}
              onChange={(e) => handleContentChange(section, item.key, e.target.value)}
              placeholder="Enter image URL"
              className="w-full"
            />
            {value && (
              <div className="mt-2 border rounded-md p-2 bg-gray-50">
                <img 
                  src={value} 
                  alt={item.label} 
                  className="h-32 object-cover mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
          </div>
        );
      default:
        return <div>Unsupported content type</div>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Content Editor</h2>
        <Button 
          variant="outline" 
          onClick={handleRevert}
          disabled={isReverting}
        >
          {isReverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reverting...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Restore Defaults
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="hero">
        <TabsList className="w-full border-b mb-6">
          {Object.keys(content).map((section) => (
            <TabsTrigger 
              key={section} 
              value={section}
              className="flex-1 capitalize"
            >
              {section}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(content).map((section) => (
          <TabsContent key={section} value={section} className="space-y-6">
            <p className="text-gray-500 text-sm mb-4">
              Edit the content for the {section} section
            </p>
            
            {content[section].map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">{item.label}</CardTitle>
                  <CardDescription>{item.type}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {renderContentForm(item, section)}
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={() => handleSave(section)}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
