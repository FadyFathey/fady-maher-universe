
import React from 'react';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tech_stack: string[];
  github_link?: string;
  live_demo_link?: string;
  featured: boolean;
  created_at: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Image */}
          {project.image_url && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center text-sm text-muted-foreground border-b pb-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(project.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 pt-4 border-t">
            {project.github_link && (
              <Button variant="outline" asChild>
                <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.live_demo_link && (
              <Button asChild>
                <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
