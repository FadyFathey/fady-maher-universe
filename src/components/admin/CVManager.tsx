
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, ExternalLink } from 'lucide-react';
import { useCVSection, useUploadCV } from '@/hooks/useCVManagement';

const CVManager = () => {
  const { data: cvSection, isLoading } = useCVSection();
  const uploadCV = useUploadCV();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadCV.mutate(selectedFile);
      setSelectedFile(null);
    }
  };

  if (isLoading) {
    return <div>Loading CV management...</div>;
  }

  const currentCVUrl = cvSection?.content?.cv_url;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">CV Management</h2>
        <p className="text-muted-foreground">
          Upload and manage your CV file
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload New CV</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cv-file">Select PDF File</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
              />
            </div>
            
            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{selectedFile.name}</span>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploadCV.isPending}
              className="w-full"
            >
              {uploadCV.isPending ? 'Uploading...' : 'Upload CV'}
            </Button>
          </CardContent>
        </Card>

        {/* Current CV Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Current CV</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentCVUrl ? (
              <>
                <div className="text-sm text-muted-foreground">
                  CV is currently available for download on the public site
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild>
                    <a href={currentCVUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Preview Current CV
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={currentCVUrl} download>
                      Download CV
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No CV uploaded yet. Upload a PDF file to make it available on your portfolio.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVManager;
