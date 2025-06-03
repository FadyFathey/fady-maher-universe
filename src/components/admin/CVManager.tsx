
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, FileText, Eye, Download } from 'lucide-react';
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

  const currentCVUrl = cvSection?.content && typeof cvSection.content === 'object' 
    ? (cvSection.content as any).cv_url 
    : null;

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
                
                {/* CV Preview Card */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Current CV</h4>
                      <p className="text-sm text-muted-foreground">PDF Document</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview CV
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <span>CV Preview</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="text-center space-y-6 py-8">
                        <div className="w-20 h-28 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto">
                          <FileText className="h-10 w-10 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-medium">Professional Resume</h4>
                          <p className="text-muted-foreground">
                            Click below to view the full CV
                          </p>
                        </div>
                        <Button asChild>
                          <a href={currentCVUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-2" />
                            Open CV in New Tab
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" asChild>
                    <a href={currentCVUrl} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download CV
                    </a>
                  </Button>
                  
                  <Button variant="outline" asChild>
                    <a href={currentCVUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Open in New Tab
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
