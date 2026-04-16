
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useUpdateSiteSection, SiteSection } from '@/hooks/useSiteSections';

interface SiteSectionFormProps {
  section: SiteSection;
  onCancel: () => void;
  onSuccess: () => void;
}

const SiteSectionForm: React.FC<SiteSectionFormProps> = ({
  section,
  onCancel,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    title: section.title,
    subtitle: section.subtitle || '',
    content: JSON.stringify(section.content, null, 2),
    is_visible: section.is_visible,
    sort_order: section.sort_order
  });

  const updateSection = useUpdateSiteSection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const contentData = JSON.parse(formData.content);
      
      await updateSection.mutateAsync({
        id: section.id,
        data: {
          title: formData.title,
          subtitle: formData.subtitle || null,
          content: contentData,
          is_visible: formData.is_visible,
          sort_order: formData.sort_order
        }
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sections
        </Button>
        <h2 className="text-2xl font-bold">Edit {section.title}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (JSON)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                className="font-mono text-sm"
                placeholder="Enter content as JSON..."
              />
              <p className="text-xs text-muted-foreground">
                Content should be valid JSON format
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_visible"
                  checked={formData.is_visible}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                />
                <Label htmlFor="is_visible">Visible on site</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={updateSection.isPending}>
                {updateSection.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSectionForm;
