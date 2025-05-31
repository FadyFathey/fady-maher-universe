
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  // Fetch published blogs from Supabase
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['published-blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button 
              variant="ghost" 
              onClick={handleBackClick}
              className="mb-8 hover:bg-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>

            <article className="space-y-8">
              {selectedPost.image_url && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <header className="space-y-4">
                <h1 className="text-4xl font-bold text-gradient">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(selectedPost.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    5 min read
                  </div>
                </div>

                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {selectedPost.content}
                </div>
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
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
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
