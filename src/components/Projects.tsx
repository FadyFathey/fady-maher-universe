import React from "react";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useTranslation } from "react-i18next";
import { projectPath } from "@/lib/slugify";
import { useProjects } from "@/hooks/useProjects";
import { getVisibleProjects, type ProjectRecord } from "@/lib/projects";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const { data: projects = [], isLoading } = useProjects();

  const visibleProjects = getVisibleProjects(projects);
  const featuredProjects = visibleProjects.filter((p) => p.featured);
  const homeProjects =
    featuredProjects.length > 0 ? featuredProjects : visibleProjects;

  const renderProjectCard = (project: ProjectRecord) => {
    const path = projectPath(project.slug, project.id);

    return (
      <Link
        key={project.id}
        to={path}
        state={{ project }}
        className="block"
      >
        <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
          <CardHeader className="p-0">
            {project.image_url ? (
              <div className="overflow-hidden rounded-t-lg">
                <OptimizedImage
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  fallbackContent={
                    <span className="text-muted-foreground">
                      {t("projects.image_unavailable")}
                    </span>
                  }
                />
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg" />
            )}
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {project.description}
              </p>
            </div>

            {project.results ? (
              <p className="text-sm font-medium text-primary line-clamp-2">
                {project.results}
              </p>
            ) : null}

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {project.created_at
                    ? new Date(project.created_at).toLocaleDateString(
                        i18n.language === "ar" ? "ar-EG" : "en-US",
                        { month: "short", year: "numeric" }
                      )
                    : ""}
                </span>
              </div>
              {project.live_demo_link && <ExternalLink className="h-3 w-3" />}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            {t("projects.case_studies_title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.case_studies_subtitle")}
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
            <p className="text-muted-foreground">{t("projects.no_projects")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeProjects.slice(0, 6).map(renderProjectCard)}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/projects">
              {t("projects.view_all")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
