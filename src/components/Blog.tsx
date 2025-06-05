
import React, { useState } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import BlogModal from './BlogModal';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch published blogs from the database
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['published-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .limit(6); // Show only 6 posts on homepage
      
      if (error) throw error;
      
      // Sort by display_order, then by created_at
      return data.sort((a, b) => {
        // If both have display_order, sort by that
        if (a.display_order !== null && b.display_order !== null) {
          return a.display_order - b.display_order;
        }
        // If only one has display_order, that one comes first
        if (a.display_order !== null) return -1;
        if (b.display_order !== null) return 1;
        // If neither has display_order, sort by created_at (newest first)
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    }
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <section id="blog" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
              Insights & Frontend Tips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge about frontend development, React.js, and modern web technologies 
              to help fellow developers build better applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section id="blog" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
              Insights & Frontend Tips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Blog posts will appear here once they are published through the admin dashboard.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            Insights & Frontend Tips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge about frontend development, React.js, and modern web technologies 
            to help fellow developers build better applications.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handlePostClick(post)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">No image available</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.tags?.[0] || 'Blog'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <span>
                    {Math.ceil(post.content?.length / 1000) || 1} min read
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Button asChild>
            <Link to="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Blog;
