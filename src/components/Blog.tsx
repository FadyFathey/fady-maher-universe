
import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Optimizing React Performance: Tips and Best Practices',
      description: 'Learn how to optimize your React applications for better performance with practical tips and real-world examples.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      category: 'React',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      title: 'Modern CSS Techniques for Better UI/UX',
      description: 'Explore modern CSS features and techniques that can enhance your user interface design and user experience.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
      category: 'CSS',
      date: '2024-01-10',
      readTime: '7 min read'
    },
    {
      title: 'TypeScript Best Practices for Large Applications',
      description: 'Discover TypeScript patterns and practices that will help you build maintainable and scalable applications.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
      category: 'TypeScript',
      date: '2024-01-05',
      readTime: '6 min read'
    }
  ];

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
              key={post.title} 
              className="group hover:shadow-lg transition-all duration-300 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
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
                    {post.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Want to read more articles and tutorials?
            </p>
            <Button asChild>
              <a href="https://blogs-v2.vercel.app" target="_blank" rel="noopener noreferrer">
                Visit My Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
