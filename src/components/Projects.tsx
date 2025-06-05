
import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import ProjectModal from './ProjectModal';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects from the database
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Sort projects by display_order, then by created_at
  const sortProjects = (projectList: any[]) => {
    return projectList.sort((a, b) => {
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
  };

  const featuredProjects = sortProjects(projects.filter(p => p.featured));
  const otherProjects = sortProjects(projects.filter(p => !p.featured));

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work, featuring modern web applications built with 
              React.js, TypeScript, and cutting-edge technologies.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projects will appear here once they are added through the admin dashboard.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
        {featuredProjects.length > 0 && (
          <div className="space-y-16 mb-16">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-slide-up cursor-pointer ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                onClick={() => handleProjectClick(project)}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    {project.github_link && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live_demo_link && (
                      <Button 
                        size="sm" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer">
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
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-64 lg:h-80 flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground">No image available</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center">Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group hover:shadow-lg transition-all duration-300 animate-scale-in cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-sm">No image available</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    <h4 className="text-xl font-semibold">{project.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between">
                    {project.github_link && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.live_demo_link && (
                      <Button 
                        size="sm" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* View More */}
        <div className="text-center mt-12 space-y-4">
          <Button asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <div>
            <Button variant="outline" asChild>
              <a href="https://github.com/FadyFathey" target="_blank" rel="noopener noreferrer">
                GitHub Profile
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
