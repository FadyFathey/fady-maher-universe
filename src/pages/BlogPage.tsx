
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogModal from '@/components/BlogModal';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    },
    {
      title: 'Building Responsive Web Applications with Tailwind CSS',
      description: 'Master responsive design with Tailwind CSS and create beautiful, mobile-first web applications.',
      fullContent: `Tailwind CSS has revolutionized how we approach styling web applications. Its utility-first approach makes it incredibly easy to build responsive, beautiful interfaces quickly.

Key benefits of Tailwind CSS:

Utility-First Approach: Instead of writing custom CSS, you compose designs using utility classes.

Mobile-First Design: Tailwind encourages mobile-first responsive design with its breakpoint system.

Consistent Design System: Pre-defined spacing, colors, and typography ensure consistency across your application.

Performance Benefits: Only the CSS you use gets included in the final bundle.

Developer Experience: Excellent IntelliSense support and documentation make development faster.

Best practices for responsive design with Tailwind:

1. Start with mobile design and use responsive prefixes (sm:, md:, lg:, xl:) to adapt for larger screens.

2. Use Flexbox and Grid utilities for complex layouts.

3. Leverage container queries with Tailwind's container utilities.

4. Customize your theme in tailwind.config.js to match your design system.

5. Use the @apply directive sparingly for complex component styles.

Tailwind CSS enables rapid prototyping and production-ready applications with minimal custom CSS.`,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      category: 'CSS',
      date: '2023-12-28',
      readTime: '8 min read',
      tags: ['Tailwind CSS', 'Responsive Design', 'CSS', 'Frontend'],
      author: 'Fady Fathey Maher'
    },
    {
      title: 'State Management in React: Redux vs Context API',
      description: 'Compare different state management solutions in React and learn when to use each approach.',
      fullContent: `State management is one of the most important aspects of React development. As applications grow in complexity, choosing the right state management solution becomes crucial.

Redux vs Context API:

Redux:
- Predictable state updates through reducers
- Time-travel debugging with Redux DevTools
- Middleware support for async operations
- Better for large applications with complex state

Context API:
- Built into React, no additional dependencies
- Simpler setup for basic state sharing
- Perfect for theme, authentication, or user preferences
- Can cause performance issues with frequent updates

When to use each:

Use Redux when:
- Your app has complex state logic
- You need time-travel debugging
- Multiple components need to update the same state
- You're working with a large team

Use Context API when:
- You need simple state sharing
- The state doesn't change frequently
- You want to avoid additional dependencies
- You're building a small to medium application

Modern alternatives like Zustand and Jotai offer simpler APIs while maintaining the benefits of dedicated state management libraries.

The key is to choose the right tool for your specific use case and team requirements.`,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
      category: 'React',
      date: '2023-12-20',
      readTime: '10 min read',
      tags: ['React', 'Redux', 'Context API', 'State Management'],
      author: 'Fady Fathey Maher'
    },
    {
      title: 'Firebase Integration in React Applications',
      description: 'Learn how to integrate Firebase services into your React applications for authentication, database, and hosting.',
      fullContent: `Firebase provides a comprehensive platform for building web applications with backend services. Its integration with React makes it an excellent choice for rapid development.

Key Firebase services for React apps:

Authentication: Easy user management with email/password, social logins, and phone authentication.

Firestore Database: NoSQL database with real-time synchronization and offline support.

Storage: File uploads and downloads with security rules.

Hosting: Fast, secure hosting with SSL certificates and global CDN.

Cloud Functions: Serverless backend logic triggered by events.

Integration steps:

1. Install Firebase SDK: npm install firebase

2. Initialize Firebase in your React app with configuration keys.

3. Set up authentication with useAuth hook for user state management.

4. Use Firestore hooks for real-time data synchronization.

5. Implement security rules to protect your data.

Best practices:

- Use Firebase emulator suite for local development
- Implement proper error handling for network issues
- Optimize Firestore queries to reduce read costs
- Use Firebase Security Rules to protect sensitive data
- Implement offline persistence for better user experience

Firebase accelerates development by providing scalable backend services without the complexity of server management.`,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      category: 'Firebase',
      date: '2023-12-15',
      readTime: '9 min read',
      tags: ['Firebase', 'React', 'Authentication', 'Database'],
      author: 'Fady Fathey Maher'
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gradient">All Blog Posts</h1>
              <p className="text-muted-foreground">
                Frontend development insights, tips, and tutorials
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.title} 
              className="group hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
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
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
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
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Blog CTA */}
        <div className="text-center mt-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Want to read more?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit my blog platform for the latest articles, tutorials, and frontend development insights.
            </p>
            <Button asChild size="lg">
              <a href="https://blogs-v2.vercel.app" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit Full Blog
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
    </div>
  );
};

export default BlogPage;
