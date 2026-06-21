import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudyProject {
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  metrics?: ProjectMetric[] | null;
}

interface CaseStudySectionsProps {
  project: CaseStudyProject;
}

const CaseStudySections = ({ project }: CaseStudySectionsProps) => {
  const { t } = useTranslation();
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];

  const sections = [
    { key: "challenge", title: t("projects.challenge"), content: project.challenge },
    { key: "solution", title: t("projects.solution"), content: project.solution },
    { key: "results", title: t("projects.results"), content: project.results },
  ].filter((s) => s.content);

  if (sections.length === 0 && metrics.length === 0) return null;

  return (
    <div className="space-y-6">
      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={`${metric.label}-${metric.value}`}
              className="rounded-lg border bg-muted/30 p-4 text-center"
            >
              <p className="text-2xl font-bold text-gradient">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </div>
          ))}
        </div>
      )}

      {sections.map((section) => (
        <div key={section.key} className="space-y-2">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseStudySections;
