import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogContent from '@/components/BlogContent';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Fetch published blogs from Supabase with updated query key and display order sorting
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['published-blogs', 'blog-page', 'with-display-order'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true);
      
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
    },
    // Reduce stale time to ensure fresher data
    staleTime: 30000, // 30 seconds
  });

  // Track views when a blog post is selected
  useEffect(() => {
    if (selectedPost?.id) {
      const trackView = async () => {
        try {
          await supabase.rpc('increment_blog_view', { 
            blog_id: selectedPost.id 
          });
          console.log('Blog view tracked:', selectedPost.id);
        } catch (error) {
          console.error('Error tracking blog view:', error);
        }
      };
      
      trackView();
    }
  }, [selectedPost?.id]);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button 
              variant="ghost" 
              onClick={handleBackClick}
              className="mb-8 hover:bg-accent transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>

            <article className="max-w-3xl mx-auto">
              {/* Hero Section */}
              <header className="mb-12 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground tracking-tight">
                    {selectedPost.title}
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
                    {selectedPost.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={selectedPost.created_at}>
                        {new Date(selectedPost.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{Math.ceil(selectedPost.content?.length / 1000) || 1} min read</span>
                    </div>
                  </div>

                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.slice(0, 3).map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />
              </header>

              {/* Featured Image */}
              {selectedPost.image_url && (
                <div className="mb-12">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                    <OptimizedImage
                      src={selectedPost.image_url}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                      fallbackContent={
                        <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center">
                          <span className="text-muted-foreground">Image unavailable</span>
                        </div>
                      }
                    />
                  </div>
                </div>
              )}

              {/* Article Content with enhanced typography */}
              <div className="article-content">
                <BlogContent content={selectedPost.content} />
              </div>

              {/* Tags Section */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedPost.tags.map((tag: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="px-3 py-1 text-sm font-normal hover:bg-accent transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Back to Blog CTA */}
              <div className="mt-16 pt-8 border-t border-border text-center">
                <Button 
                  onClick={handleBackClick}
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Posts
                </Button>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
              Frontend Development Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tips, and tutorials about modern web development, React.js, 
              and frontend best practices.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No blog posts yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post: any, index: number) => (
                <Card 
                  key={post.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  <CardHeader className="p-0">
                    {post.image_url ? (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <OptimizedImage
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          fallbackContent={
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                              <div className="text-primary/60 text-6xl font-bold">
                                {post.title.charAt(0)}
                              </div>
                            </div>
                          }
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                        <div className="text-primary/60 text-6xl font-bold">
                          {post.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          <Tag className="h-3 w-3 mr-1" />
                          {post.tags[0]}
                        </Badge>
                      </div>
                    )}
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
                      <span>5 min read</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
