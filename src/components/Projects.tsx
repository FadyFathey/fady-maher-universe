import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const Projects = () => {
  const projects = [
    {
      title: 'CRM System',
      description: 'Dynamic customer relationship management system with responsive design, improving user management efficiency for sales teams. Features comprehensive dashboard, lead tracking, and analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Redux'],
      githubUrl: 'https://github.com/FadyFathey/sales-crm.git',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Misr Lel Kher Organization',
      description: 'Non-profit organization website with enhanced user accessibility and donation tracking features. Optimized for performance and SEO to maximize outreach.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'Responsive Design'],
      githubUrl: 'https://github.com/FadyFathey/misr-lelkher-organization.git',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Jusor Translation Services',
      description: 'Professional translation services platform with SEO optimization and modern UI. Incorporates advanced features for service management and client communication.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      technologies: ['React.js', 'Bootstrap', 'JavaScript', 'SEO'],
      githubUrl: 'https://github.com/FadyFathey/Jusor---Professional-Translation-Services-Translation-Company.git',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Digitalize Platform',
      description: 'Business services platform with modern design and comprehensive features. Built with reusable components and modular codebase architecture.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
      githubUrl: 'https://github.com/FadyFathey/digitalize-v.2.git',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'BlogSphere',
      description: 'Modern blogging platform with React.js, featuring pagination, responsive design, and optimized performance. Clean and intuitive content management.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
      technologies: ['React.js', 'React Router', 'Tailwind CSS', 'Axios'],
      githubUrl: '#',
      liveUrl: 'https://blogs-v2.vercel.app',
      featured: false
    },
    {
      title: 'E-Commerce Platform',
      description: 'Dynamic e-commerce platform with responsive UI, Firebase authentication, and real-time database management. Comprehensive shopping experience with modern design.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React.js', 'Tailwind CSS', 'Firebase', 'Vite'],
      githubUrl: '#',
      liveUrl: 'https://e-commerce-website-six-phi.vercel.app/',
      featured: true
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web applications built with 
            React.js, TypeScript, and cutting-edge technologies.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-16">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.title}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-slide-up ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  {project.githubUrl !== '#' && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl !== '#' && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.title} className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-xl font-semibold">{project.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex justify-between">
                  {project.githubUrl !== '#' && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {project.liveUrl !== '#' && (
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <a href="https://github.com/FadyFathey" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
