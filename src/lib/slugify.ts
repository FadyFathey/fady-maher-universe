export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function projectPath(slug: string | null | undefined, id: string): string {
  const segment = slug || id;
  return `/projects/${encodeURIComponent(segment)}`;
}

export function blogPath(slug: string | null | undefined, id: string): string {
  return `/blog/${slug || id}`;
}
