import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Calendar, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import ProjectModal from '@/components/ProjectModal';

type Project = {
  id: string;
  title: string;
  description: string;
  image_url?: string | null;
  tech_stack: string[];
  github_link?: string | null;
  live_demo_link?: string | null;
  featured: boolean;
  visible?: boolean | null;
  created_at: string;
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []).map((project: any) => ({
        ...project,
        tech_stack: project.tech_stack ?? [],
        featured: Boolean(project.featured),
      })) as Project[];
    },
  });

  const visibleProjects = projects.filter((p) => p.visible !== false);
  const featuredProjects = visibleProjects.filter((p) => p.featured);
  const homeProjects =
    featuredProjects.length > 0
      ? featuredProjects
      : visibleProjects.sort((a, b) => {
          const aDate = new Date(a.created_at).getTime();
          const bDate = new Date(b.created_at).getTime();
          return bDate - aDate;
        });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Featured work from my recent frontend and full-stack builds.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : homeProjects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeProjects.slice(0, 6).map((project) => (
              <Card
                key={project.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader className="p-0">
                  {project.image_url ? (
                    <div className="overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        fallbackContent={<span className="text-muted-foreground">Image unavailable</span>}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg" />
                  )}
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                  </div>

                  {!!project.tech_stack?.length && (
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech, i) => (
                        <Badge key={`${project.id}-${tech}-${i}`} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(project.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.github_link && <Github className="h-3 w-3" />}
                      {project.live_demo_link && <ExternalLink className="h-3 w-3" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
