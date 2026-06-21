import { slugify } from "./slugify";

export type ProjectRecord = {
  id: string;
  title: string;
  description: string;
  created_at?: string | null;
  image_url?: string | null;
  tech_stack: string[];
  github_link?: string | null;
  live_demo_link?: string | null;
  featured?: boolean | null;
  visible?: boolean | null;
  slug?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  metrics?: { label: string; value: string }[] | null;
  display_order?: number | null;
};

function normalizeMetrics(raw: unknown): { label: string; value: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is { label: string; value: string } =>
        item != null &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item &&
        typeof (item as { label: unknown }).label === "string" &&
        typeof (item as { value: unknown }).value === "string"
    )
    .map((item) => ({ label: item.label, value: item.value }));
}

export function normalizeProject(raw: Record<string, unknown>): ProjectRecord {
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    created_at: (raw.created_at as string | null) ?? null,
    image_url: (raw.image_url as string | null) ?? null,
    tech_stack: Array.isArray(raw.tech_stack)
      ? raw.tech_stack.map(String)
      : [],
    github_link: (raw.github_link as string | null) ?? null,
    live_demo_link: (raw.live_demo_link as string | null) ?? null,
    featured: Boolean(raw.featured),
    visible: raw.visible !== false,
    slug: (raw.slug as string | null) ?? null,
    challenge: (raw.challenge as string | null) ?? null,
    solution: (raw.solution as string | null) ?? null,
    results: (raw.results as string | null) ?? null,
    metrics: normalizeMetrics(raw.metrics),
    display_order: (raw.display_order as number | null) ?? null,
  };
}

function slugMatches(project: ProjectRecord, rawSlug: string): boolean {
  const decoded = decodeURIComponent(rawSlug).trim();
  const normalized = decoded.toLowerCase();

  if (project.id === decoded || project.id === normalized) return true;

  const projectSlug = project.slug?.trim();
  if (projectSlug) {
    if (projectSlug === decoded) return true;
    if (projectSlug.toLowerCase() === normalized) return true;
    if (slugify(projectSlug) === normalized) return true;
  }

  if (slugify(project.title) === normalized) return true;

  return false;
}

export function findProjectBySlug(
  projects: ProjectRecord[],
  slug: string | undefined
): ProjectRecord | null {
  if (!slug) return null;
  return projects.find((project) => slugMatches(project, slug)) ?? null;
}

export function sortProjects(projects: ProjectRecord[]): ProjectRecord[] {
  return [...projects].sort((a, b) => {
    if (a.display_order != null && b.display_order != null) {
      return a.display_order - b.display_order;
    }
    if (a.display_order != null) return -1;
    if (b.display_order != null) return 1;
    return (
      new Date(b.created_at ?? 0).getTime() -
      new Date(a.created_at ?? 0).getTime()
    );
  });
}

export function getVisibleProjects(projects: ProjectRecord[]): ProjectRecord[] {
  return sortProjects(projects.filter((project) => project.visible !== false));
}
