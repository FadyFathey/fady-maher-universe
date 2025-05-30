
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const Technologies = () => {
  const techCategories = [
    {
      title: 'Frontend Frameworks',
      icon: '⚛️',
      technologies: ['React.js', 'Angular', 'TypeScript', 'JavaScript']
    },
    {
      title: 'Styling & Design',
      icon: '🎨',
      technologies: ['Tailwind CSS', 'CSS3', 'HTML5', 'Bootstrap']
    },
    {
      title: 'State Management',
      icon: '🔄',
      technologies: ['Redux', 'React Router', 'React Paginate']
    },
    {
      title: 'Backend & APIs',
      icon: '🔧',
      technologies: ['Firebase', 'Axios', 'SMTP Integration']
    },
    {
      title: 'Development Tools',
      icon: '🛠️',
      technologies: ['Git', 'Postman', 'Chrome DevTools', 'Jira', 'Vite']
    },
    {
      title: 'Skills & Practices',
      icon: '💡',
      technologies: ['SEO Optimization', 'Responsive Design', 'Performance Optimization', 'Accessibility']
    }
  ];

  return (
    <section id="technologies" className="py-20 lg:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
            Technologies & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and frameworks I use to build 
            exceptional web applications and deliver outstanding user experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/60 backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 animate-scale-in" style={{ animationDelay: '600ms' }}>
            <div className="text-3xl font-bold text-gradient">20+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="space-y-2 animate-scale-in" style={{ animationDelay: '700ms' }}>
            <div className="text-3xl font-bold text-gradient">6+</div>
            <div className="text-sm text-muted-foreground">Major Projects</div>
          </div>
          <div className="space-y-2 animate-scale-in" style={{ animationDelay: '800ms' }}>
            <div className="text-3xl font-bold text-gradient">1+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="space-y-2 animate-scale-in" style={{ animationDelay: '900ms' }}>
            <div className="text-3xl font-bold text-gradient">100%</div>
            <div className="text-sm text-muted-foreground">Responsive Design</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
