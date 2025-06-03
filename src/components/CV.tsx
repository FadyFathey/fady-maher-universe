
import React from 'react';
import { Button } from './ui/button';
import { Download, Eye, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useSiteSections } from '@/hooks/useSiteSections';

const CV = () => {
  const { data: sections } = useSiteSections();
  
  const cvSection = sections?.find(section => section.section_key === 'cv');
  
  if (!cvSection || !cvSection.content) {
    return null;
  }

  const content = cvSection.content as any;
  const { heading, description, cv_url, download_text } = content;

  if (!cv_url) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              {heading || "My Resume"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description || "Download my latest CV to learn more about my professional experience and qualifications."}
            </p>
          </div>

          {/* CV Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-lg border shadow-lg p-8">
              <div className="flex items-center justify-center space-y-6 flex-col">
                {/* CV Icon/Thumbnail */}
                <div className="w-24 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <FileText className="h-12 w-12 text-white" />
                </div>
                
                {/* CV Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Professional Resume</h3>
                  <p className="text-muted-foreground">PDF Document</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full max-w-sm">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full h-[90vh]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <span>CV Preview</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 w-full h-full bg-muted rounded-lg p-4">
                        <div className="text-center space-y-4 py-12">
                          <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                          <div className="space-y-2">
                            <h4 className="text-lg font-medium">CV Preview</h4>
                            <p className="text-muted-foreground">
                              Click below to view the full CV in a new tab
                            </p>
                          </div>
                          <Button asChild size="lg">
                            <a href={cv_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-2" />
                              Open CV in New Tab
                            </a>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button asChild className="flex-1">
                    <a href={cv_url} download>
                      <Download className="h-4 w-4 mr-2" />
                      {download_text || "Download"}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
