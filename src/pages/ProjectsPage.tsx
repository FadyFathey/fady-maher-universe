import React, { useEffect, useMemo } from "react";
import { ArrowLeft, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link, useLocation, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import CaseStudySections from "@/components/CaseStudySections";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { projectPath } from "@/lib/slugify";
import { useProjects } from "@/hooks/useProjects";
import {
  findProjectBySlug,
  getVisibleProjects,
  normalizeProject,
  type ProjectRecord,
} from "@/lib/projects";

type LocationState = {
  project?: ProjectRecord;
};

const ProjectsPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { data: projects = [], isLoading, isError, refetch } = useProjects();

  const navigationProject = (location.state as LocationState | null)?.project;
  const visibleProjects = getVisibleProjects(projects);

  const selectedProject = useMemo(() => {
    if (!slug) return null;

    const fromNavigation =
      navigationProject && findProjectBySlug([navigationProject], slug);
    if (fromNavigation) return fromNavigation;

    return findProjectBySlug(visibleProjects, slug);
  }, [slug, navigationProject, visibleProjects]);

  useEffect(() => {
    if (selectedProject?.id) {
      supabaseSafeIncrementView(selectedProject.id);
    }
  }, [selectedProject?.id]);

  const showDetailLoading = Boolean(slug && isLoading && !selectedProject);
  const showDetailNotFound = Boolean(slug && !isLoading && !selectedProject && !isError);
  const showDetailError = Boolean(slug && isError && !selectedProject);

  if (showDetailLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-64 bg-muted rounded-lg" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showDetailError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 text-center py-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{t("common.error")}</h1>
          <p className="text-muted-foreground mb-6">{t("projects.load_error")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => refetch()}>{t("common.retry", "Try Again")}</Button>
            <Button variant="outline" asChild>
              <Link to="/projects">{t("projects.back_to_projects")}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showDetailNotFound) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 text-center py-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{t("projects.not_found")}</h1>
          <Button asChild>
            <Link to="/projects">{t("projects.back_to_projects")}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (selectedProject) {
    return (
      <ProjectDetailView project={selectedProject} t={t} i18n={i18n} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Case Studies & Projects | Fady Fathey Maher"
        description={t("projects.featured_subtitle")}
        path="/projects"
      />
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
              {t("projects.case_studies_title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("projects.case_studies_subtitle")}
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-muted rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : visibleProjects.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">{t("projects.no_projects")}</h2>
              <p className="text-muted-foreground">{t("projects.no_projects_desc")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <Link
                  key={project.id}
                  to={projectPath(project.slug, project.id)}
                  state={{ project }}
                  className="block"
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 h-full">
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
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      {project.results && (
                        <p className="text-sm font-medium text-primary line-clamp-2">
                          {project.results}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className={`mr-2 h-4 w-4 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                {t("projects.back_to_portfolio")}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function ProjectDetailView({
  project,
  t,
  i18n,
}: {
  project: ProjectRecord;
  t: TFunction;
  i18n: { language: string };
}) {
  const safeProject = normalizeProject(project as unknown as Record<string, unknown>);
  const techStack = safeProject.tech_stack;

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={`${safeProject.title} | Case Study | Fady Fathey Maher`}
        description={safeProject.description || safeProject.title}
        path={projectPath(safeProject.slug, safeProject.id)}
      />
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" asChild className="mb-8 hover:bg-accent">
            <Link to="/projects">
              <ArrowLeft className={`mr-2 h-4 w-4 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
              {t("projects.back_to_projects")}
            </Link>
          </Button>

          <div className="space-y-8">
            {safeProject.image_url && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <OptimizedImage
                  src={safeProject.image_url}
                  alt={safeProject.title}
                  className="w-full h-full object-cover"
                  fallbackContent={
                    <span className="text-muted-foreground">
                      {t("projects.image_unavailable")}
                    </span>
                  }
                />
              </div>
            )}

            <header className="space-y-4">
              <h1 className="text-4xl font-bold text-gradient">{safeProject.title}</h1>
              {safeProject.created_at && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(safeProject.created_at).toLocaleDateString(
                    i18n.language === "ar" ? "ar-EG" : "en-US",
                    { year: "numeric", month: "long" }
                  )}
                </div>
              )}
              {safeProject.live_demo_link && (
                <div>
                  <Button size="lg" asChild>
                    <a
                      href={safeProject.live_demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t("projects.live_demo")}
                    </a>
                  </Button>
                </div>
              )}
            </header>

            <CaseStudySections project={safeProject} />

            {safeProject.description && (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="text-foreground">{t("projects.about_project")}</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {safeProject.description}
                </p>
              </div>
            )}

            {techStack.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-muted-foreground">
                  {t("projects.tech_used")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button asChild size="lg">
                <Link to="/#contact">
                  {t("projects.similar_cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function supabaseSafeIncrementView(projectId: string) {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.rpc("increment_project_view", { project_id: projectId });
  } catch {
    // Non-critical analytics call — never block page render
  }
}

export default ProjectsPage;
