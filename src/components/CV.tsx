
import React from 'react';
import { Button } from './ui/button';
import { Download, Eye } from 'lucide-react';
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
    <section id="cv" className="py-20 bg-muted/50">
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

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Preview CV</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>CV Preview</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full h-full">
                  <object
                    data={cv_url}
                    type="application/pdf"
                    className="w-full h-full rounded-lg"
                    style={{ minHeight: '600px' }}
                  >
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                      <div className="text-center space-y-4">
                        <p className="text-muted-foreground">
                          PDF preview not supported in this browser.
                        </p>
                        <Button asChild>
                          <a href={cv_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </a>
                        </Button>
                      </div>
                    </div>
                  </object>
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild size="lg" className="flex items-center space-x-2">
              <a href={cv_url} download>
                <Download className="h-5 w-5" />
                <span>{download_text || "Download CV"}</span>
              </a>
            </Button>
          </div>

          {/* Embedded Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg border shadow-lg overflow-hidden">
              <div className="aspect-[8.5/11] w-full">
                <object
                  data={cv_url}
                  type="application/pdf"
                  className="w-full h-full"
                  style={{ minHeight: '600px' }}
                >
                  <div className="flex items-center justify-center h-full bg-muted">
                    <div className="text-center space-y-4">
                      <p className="text-muted-foreground">
                        PDF preview not available. Your browser may not support embedded PDFs.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              Try Modal Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl w-full h-[90vh]">
                            <DialogHeader>
                              <DialogTitle>CV Preview</DialogTitle>
                            </DialogHeader>
                            <iframe
                              src={cv_url}
                              className="w-full h-full border rounded-lg"
                              title="CV Preview"
                            />
                          </DialogContent>
                        </Dialog>
                        <Button asChild variant="outline">
                          <a href={cv_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Open in New Tab
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
