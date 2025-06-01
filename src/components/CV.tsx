
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Download, Eye, FileText } from 'lucide-react';
import { useSiteSections } from '@/hooks/useSiteSections';

const CV = () => {
  const { data: sections } = useSiteSections();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const cvSection = sections?.find(section => section.section_key === 'cv');
  
  if (!cvSection || !cvSection.content?.cv_url) {
    return null;
  }

  const { heading, description, cv_url, download_text } = cvSection.content;

  return (
    <section id="cv" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Preview CV</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>CV Preview</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full h-full">
                  <iframe
                    src={cv_url}
                    className="w-full h-full border rounded-lg"
                    title="CV Preview"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild size="lg" className="flex items-center space-x-2">
              <a href={cv_url} download>
                <Download className="h-5 w-5" />
                <span>{download_text}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
