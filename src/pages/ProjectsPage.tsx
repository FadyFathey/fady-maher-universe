import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Fetch projects from Supabase
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

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
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
              Back to Projects
            </Button>

            <div className="space-y-8">
              {selectedProject.image_url && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={selectedProject.image_url}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    fallbackContent={<span className="text-muted-foreground">Image unavailable</span>}
                  />
                </div>
              )}

              <div className="space-y-6">
                <header className="space-y-4">
                  <h1 className="text-4xl font-bold text-gradient">
                    {selectedProject.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(selectedProject.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github_link && (
                      <Button variant="outline" asChild>
                        <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                    {selectedProject.live_demo_link && (
                      <Button asChild>
                        <a href={selectedProject.live_demo_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </header>

                <div className="prose prose-lg max-w-none">
                  <h2>About This Project</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Technologies Used</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
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
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my latest work in frontend development, featuring modern web applications 
              built with React, TypeScript, and cutting-edge technologies.
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
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No projects yet</h2>
              <p className="text-muted-foreground">Check back soon for new projects!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Card 
                  key={project.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader className="p-0">
                    {project.image_url ? (
                      <div className="relative overflow-hidden rounded-t-lg">
                        <OptimizedImage
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          fallbackContent={
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                              <div className="text-primary/60 text-6xl font-bold">
                                {project.title.charAt(0)}
                              </div>
                            </div>
                          }
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                        <div className="text-primary/60 text-6xl font-bold">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech_stack.slice(0, 3).map((tech: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tech_stack.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(project.created_at).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.github_link && (
                          <Github className="h-3 w-3" />
                        )}
                        {project.live_demo_link && (
                          <ExternalLink className="h-3 w-3" />
                        )}
                      </div>
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

export default ProjectsPage;
