
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, FileText, Eye, Download, Link } from 'lucide-react';
import { useCVSection, useUploadCV, useUpdateCVSection } from '@/hooks/useCVManagement';

const CVManager = () => {
  const { data: cvSection, isLoading } = useCVSection();
  const uploadCV = useUploadCV();
  const updateCVSection = useUpdateCVSection();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [googleDriveUrl, setGoogleDriveUrl] = useState('');

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

  const handleUpdateGoogleDriveUrl = () => {
    if (cvSection && googleDriveUrl.trim()) {
      const updatedContent = {
        ...cvSection.content,
        google_drive_preview_url: googleDriveUrl.trim()
      };
      
      updateCVSection.mutate({
        id: cvSection.id,
        data: { content: updatedContent }
      });
      
      setGoogleDriveUrl('');
    }
  };

  if (isLoading) {
    return <div>Loading CV management...</div>;
  }

  const currentCVUrl = cvSection?.content && typeof cvSection.content === 'object' 
    ? (cvSection.content as any).cv_url 
    : null;

  const currentGoogleDriveUrl = cvSection?.content && typeof cvSection.content === 'object' 
    ? (cvSection.content as any).google_drive_preview_url 
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">CV Management</h2>
        <p className="text-muted-foreground">
          Upload and manage your CV file and preview settings
        </p>
      </div>

      <div className="grid gap-6">
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

        {/* Google Drive Preview URL Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Link className="h-5 w-5" />
              <span>Google Drive Preview URL</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google-drive-url">
                Google Drive Preview URL (format: https://drive.google.com/file/d/FILE_ID/preview)
              </Label>
              <Input
                id="google-drive-url"
                type="url"
                placeholder="https://drive.google.com/file/d/1sGA6FxUt946ANMO33Utc9x5uYKcZDF9t/preview"
                value={googleDriveUrl}
                onChange={(e) => setGoogleDriveUrl(e.target.value)}
              />
            </div>
            
            {currentGoogleDriveUrl && (
              <div className="text-sm text-muted-foreground">
                Current URL: {currentGoogleDriveUrl}
              </div>
            )}

            <Button 
              onClick={handleUpdateGoogleDriveUrl} 
              disabled={!googleDriveUrl.trim() || updateCVSection.isPending}
              variant="outline"
              className="w-full"
            >
              {updateCVSection.isPending ? 'Updating...' : 'Update Preview URL'}
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
                      {currentGoogleDriveUrl && (
                        <p className="text-xs text-green-600">Preview URL configured</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
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
