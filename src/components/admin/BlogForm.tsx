import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface BlogFormProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: any;
}

const BlogForm: React.FC<BlogFormProps> = ({ isOpen, onClose, blog }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    published: false,
    display_order: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        published: blog.published || false,
        display_order: blog.display_order ? blog.display_order.toString() : '',
      });
      setImagePreview(blog.image_url || '');
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        published: false,
        display_order: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [blog, isOpen]);

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `blog-${Date.now()}.${fileExt}`;
    
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
    mutationFn: async (data: any) => {
      let imageUrl = blog?.image_url;

      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const blogData = {
        ...data,
        tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        image_url: imageUrl,
        display_order: data.display_order ? parseInt(data.display_order) : null,
      };

      if (blog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', blog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      // Invalidate all relevant query keys to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['published-blogs'] });
      queryClient.invalidateQueries({ queryKey: ['published-blogs', 'with-display-order'] });
      queryClient.invalidateQueries({ queryKey: ['published-blogs', 'blog-page', 'with-display-order'] });
      toast({
        title: "Success",
        description: blog ? "Blog post updated successfully" : "Blog post created successfully",
      });
      onClose();
    },
    onError: (error) => {
      setUploading(false);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {blog ? 'Edit Blog Post' : 'Add New Blog Post'}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="A short description of your blog post..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your blog post content here..."
              rows={12}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="React, TypeScript, Frontend"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order (optional)</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              placeholder="1, 2, 3... (lower numbers appear first)"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <div className="space-y-4">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || uploading}>
              {(mutation.isPending || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {blog ? 'Update' : 'Create'} Blog Post
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default BlogForm;
