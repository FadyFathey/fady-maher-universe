
import React from 'react';
import { Button } from './ui/button';
import { Download, Eye, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
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

          {/* CV Preview Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg border shadow-lg overflow-hidden">
              {/* PDF Preview Container */}
              <div className="relative bg-gray-50 p-8 min-h-[600px] flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
                  <div className="text-center space-y-6">
                    {/* CV Icon */}
                    <div className="w-24 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg mx-auto">
                      <FileText className="h-12 w-12 text-white" />
                    </div>
                    
                    {/* CV Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">Professional Resume</h3>
                      <p className="text-muted-foreground">Click below to view or download my latest CV</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="lg">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview CV
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl w-full h-[90vh] p-6">
                          <DialogHeader className="space-y-3">
                            <DialogTitle className="flex items-center space-x-2">
                              <FileText className="h-5 w-5" />
                              <span>CV Preview</span>
                            </DialogTitle>
                            <DialogDescription>
                              View my professional resume below. You can also open it in a new tab or download it directly.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {/* PDF Viewer Container */}
                          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative">
                            <iframe
                              src={`${cv_url}#toolbar=1&navpanes=1&scrollbar=1`}
                              className="w-full h-full border-0"
                              title="CV Preview"
                              loading="lazy"
                            />
                            
                            {/* Fallback for browsers that don't support iframe PDF viewing */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                              <div className="text-center space-y-4 pointer-events-auto">
                                <FileText className="h-16 w-16 mx-auto text-gray-400" />
                                <div className="space-y-2">
                                  <h4 className="text-lg font-medium text-gray-700">Can't view PDF inline?</h4>
                                  <p className="text-gray-500">Click below to open in a new tab</p>
                                </div>
                                <Button asChild>
                                  <a href={cv_url} target="_blank" rel="noopener noreferrer">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Open in New Tab
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Modal Action Buttons */}
                          <div className="flex gap-3 pt-4 border-t">
                            <Button asChild variant="outline" className="flex-1">
                              <a href={cv_url} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-2" />
                                Open in New Tab
                              </a>
                            </Button>
                            <Button asChild className="flex-1">
                              <a href={cv_url} download>
                                <Download className="h-4 w-4 mr-2" />
                                {download_text || "Download CV"}
                              </a>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button asChild size="lg">
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
        </div>
      </div>
    </section>
  );
};

export default CV;
