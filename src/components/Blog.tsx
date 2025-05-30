
import React, { useState } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import BlogModal from './BlogModal';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogPosts = [
    {
      title: 'Optimizing React Performance: Tips and Best Practices',
      description: 'Learn how to optimize your React applications for better performance with practical tips and real-world examples.',
      fullContent: `React performance optimization is crucial for creating smooth user experiences. In this comprehensive guide, we'll explore various techniques to make your React applications faster and more efficient.

One of the most important concepts is understanding when and why React re-renders components. Every time a component's state or props change, React will re-render that component and its children. This can become expensive when dealing with large component trees.

Here are some key strategies:

1. Use React.memo for functional components to prevent unnecessary re-renders when props haven't changed.

2. Implement useMemo and useCallback hooks to memoize expensive calculations and function references.

3. Code splitting with React.lazy() and Suspense to load components only when needed.

4. Optimize your bundle size by analyzing what's being included and removing unused dependencies.

5. Use the React DevTools Profiler to identify performance bottlenecks in your application.

Remember, premature optimization is the root of all evil. Always measure first, then optimize based on actual performance issues rather than assumptions.`,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      category: 'React',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
      author: 'Fady Fathey Maher'
    },
    {
      title: 'Modern CSS Techniques for Better UI/UX',
      description: 'Explore modern CSS features and techniques that can enhance your user interface design and user experience.',
      fullContent: `CSS has evolved tremendously over the past few years, introducing powerful features that make creating beautiful and responsive interfaces easier than ever.

CSS Grid and Flexbox have revolutionized how we approach layout design. Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional arrangements.

Modern CSS also includes:

CSS Custom Properties (Variables): Create maintainable stylesheets with reusable values that can be updated dynamically.

Container Queries: Style components based on their container size rather than viewport size, enabling truly component-based responsive design.

CSS Logical Properties: Write more internationalization-friendly CSS that adapts to different writing modes and directions.

New Pseudo-classes: :is(), :where(), and :has() provide more powerful and efficient selectors.

Clamp(), Min(), and Max(): Create fluid typography and spacing that adapts to different screen sizes.

Aspect Ratio: Maintain consistent proportions across different screen sizes without JavaScript.

These modern techniques allow us to create more maintainable, performant, and accessible user interfaces.`,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop',
      category: 'CSS',
      date: '2024-01-10',
      readTime: '7 min read',
      tags: ['CSS', 'UI/UX', 'Frontend', 'Design'],
      author: 'Fady Fathey Maher'
    },
    {
      title: 'TypeScript Best Practices for Large Applications',
      description: 'Discover TypeScript patterns and practices that will help you build maintainable and scalable applications.',
      fullContent: `TypeScript has become the go-to choice for building large-scale JavaScript applications. Its type system helps catch errors early and makes code more maintainable.

Here are essential best practices for TypeScript in large applications:

Strict Configuration: Always use strict mode in your tsconfig.json to catch more potential issues.

Interface vs Type: Use interfaces for object shapes that might be extended, and type aliases for unions, primitives, and computed types.

Generic Types: Leverage generics to create reusable components and functions while maintaining type safety.

Utility Types: Master built-in utility types like Partial, Pick, Omit, and Record to manipulate types efficiently.

Module Organization: Structure your types in separate files and use barrel exports for clean imports.

Discriminated Unions: Use discriminated unions for handling different states or variants in your application.

Type Guards: Implement type guards to safely narrow types at runtime.

Avoid 'any': Resist the temptation to use 'any' - use 'unknown' or more specific types instead.

These practices will help you build more robust and maintainable TypeScript applications.`,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
      category: 'TypeScript',
      date: '2024-01-05',
      readTime: '6 min read',
      tags: ['TypeScript', 'JavaScript', 'Best Practices', 'Development'],
      author: 'Fady Fathey Maher'
    }
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

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
              onClick={() => handlePostClick(post)}
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
