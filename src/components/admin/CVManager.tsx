
import React, { useState } from 'react';
import { useCVSection, useUpdateCVSection, useUploadCV } from '@/hooks/useCVManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CVManager = () => {
  const { data: cvSection, isLoading } = useCVSection();
  const updateCVSection = useUpdateCVSection();
  const uploadCV = useUploadCV();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    cv_url: '',
    download_text: '',
    google_drive_preview_url: ''
  });

  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    if (cvSection?.content) {
      const content = cvSection.content as any;
      setFormData({
        heading: content.heading || '',
        description: content.description || '',
        cv_url: content.cv_url || '',
        download_text: content.download_text || '',
        google_drive_preview_url: content.google_drive_preview_url || ''
      });
    }
  }, [cvSection]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!cvSection) return;

    try {
      await updateCVSection.mutateAsync({
        id: cvSection.id,
        data: {
          content: formData,
          updated_at: new Date().toISOString()
        }
      });
      setHasChanges(false);
    } catch (error) {
      console.error('Error updating CV section:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    try {
      await uploadCV.mutateAsync(file);
    } catch (error) {
      console.error('Error uploading CV:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CV Management</h2>
          <p className="text-muted-foreground">Manage your CV section content and file</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} disabled={updateCVSection.isPending}>
            {updateCVSection.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Content Form */}
        <Card>
          <CardHeader>
            <CardTitle>CV Section Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Section Heading</Label>
              <Input
                id="heading"
                value={formData.heading}
                onChange={(e) => handleInputChange('heading', e.target.value)}
                placeholder="My Resume"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Download my latest CV to learn more about my professional experience..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="download_text">Download Button Text</Label>
              <Input
                id="download_text"
                value={formData.download_text}
                onChange={(e) => handleInputChange('download_text', e.target.value)}
                placeholder="Download CV"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv_url">CV Download URL</Label>
              <Input
                id="cv_url"
                value={formData.cv_url}
                onChange={(e) => handleInputChange('cv_url', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="google_drive_preview_url">Google Drive Preview URL</Label>
              <Input
                id="google_drive_preview_url"
                value={formData.google_drive_preview_url}
                onChange={(e) => handleInputChange('google_drive_preview_url', e.target.value)}
                placeholder="https://drive.google.com/file/d/FILE_ID/preview"
              />
              <p className="text-xs text-muted-foreground">
                Use format: https://drive.google.com/file/d/YOUR_FILE_ID/preview
              </p>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>CV File Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cv-file">Upload New CV (PDF)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploadCV.isPending}
              />
              {uploadCV.isPending && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading CV...
                </p>
              )}
            </div>

            {formData.cv_url && (
              <div className="space-y-2">
                <Label>Current CV File</Label>
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm flex-1">CV File Available</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={formData.cv_url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {formData.google_drive_preview_url && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    src={formData.google_drive_preview_url}
                    width="100%"
                    height="300"
                    allow="autoplay"
                    style={{ border: 'none' }}
                    title="CV Preview"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVManager;
