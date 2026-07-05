export const PROFILE_IMAGES_BUCKET = "portfolio-images";

export type AboutSectionContent = {
  image_url?: string | null;
  experience?: unknown[];
  education?: string;
  [key: string]: unknown;
};

export function getProfileImageUrl(content: AboutSectionContent | null | undefined): string | null {
  const url = content?.image_url;
  return typeof url === "string" && url.trim().length > 0 ? url : null;
}
