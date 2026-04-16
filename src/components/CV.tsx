
import React from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
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

          {/* Download Button */}
          <div className="text-center">
            <Button asChild size="lg">
              <a href={cv_url} download>
                <Download className="h-4 w-4 mr-2" />
                {download_text || "Download CV"}
              </a>
            </Button>
          </div>

          {/* CV Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg border shadow-lg overflow-hidden">
              <iframe
                src="https://drive.google.com/file/d/1sGA6FxUt946ANMO33Utc9x5uYKcZDF9t/preview"
                width="100%"
                height="600"
                allow="autoplay"
                style={{ border: 'none', borderRadius: '12px' }}
                title="CV Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
