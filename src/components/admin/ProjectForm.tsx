import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ isOpen, onClose, project }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    live_demo_link: '',
    image_url: '',
    featured: false,
    visible: true,
    display_order: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
        github_link: project.github_link || '',
        live_demo_link: project.live_demo_link || '',
        image_url: project.image_url || '',
        featured: Boolean(project.featured),
        visible: project.visible !== false,
        display_order: project.display_order ? String(project.display_order) : '',
      });
      setImagePreview(project.image_url || '');
    } else {
      setFormData({
        title: '',
        description: '',
        tech_stack: '',
        github_link: '',
        live_demo_link: '',
        image_url: '',
        featured: false,
        visible: true,
        display_order: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [project, isOpen]);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `project-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      let imageUrl = formData.image_url || null;

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        tech_stack: formData.tech_stack
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        github_link: formData.github_link || null,
        live_demo_link: formData.live_demo_link || null,
        image_url: imageUrl,
        featured: formData.featured,
        visible: formData.visible,
        display_order: formData.display_order ? parseInt(formData.display_order, 10) : null,
      };

      if (project?.id) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Success',
        description: project ? 'Project updated successfully' : 'Project created successfully',
      });
      onClose();
    },
    onError: () => {
      setUploading(false);
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[640px] sm:max-w-[640px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{project ? 'Edit Project' : 'Add New Project'}</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Project overview..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
            <Input
              id="tech_stack"
              value={formData.tech_stack}
              onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
              placeholder="React, TypeScript, Supabase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_link">GitHub Link</Label>
              <Input
                id="github_link"
                value={formData.github_link}
                onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live_demo_link">Live Demo Link</Label>
              <Input
                id="live_demo_link"
                value={formData.live_demo_link}
                onChange={(e) => setFormData({ ...formData, live_demo_link: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order (optional)</Label>
            <Input
              id="display_order"
              type="number"
              min="1"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              placeholder="1, 2, 3..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL (optional)</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => {
                setFormData({ ...formData, image_url: e.target.value });
                if (!imageFile) setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_file">Or Upload Image</Label>
            <Input id="image_file" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Project preview"
                className="w-full h-44 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="visible"
                checked={formData.visible}
                onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
              />
              <Label htmlFor="visible">Visible on public portfolio</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || uploading}>
              {(mutation.isPending || uploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {project ? 'Update' : 'Create'} Project
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectForm;