
import React from 'react';
import { Calendar, Tag, Clock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { OptimizedImage } from './ui/optimized-image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  tags: string[];
  created_at: string;
  published: boolean;
}

interface BlogModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ post, isOpen, onClose }: BlogModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {post.image_url && (
            <div className="relative overflow-hidden rounded-lg">
              <OptimizedImage
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 object-cover"
                fallbackContent={<span className="text-muted-foreground">Image unavailable</span>}
              />
              {post.tags && post.tags.length > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.tags[0]}
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground border-b pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.ceil(post.content?.length / 1000) || 1} min read</span>
              </div>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-4">
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
