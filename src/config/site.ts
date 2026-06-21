export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://portfolio-fady-fathey.vercel.app";

export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "";

export const SOCIAL = {
  github: "https://github.com/FadyFathey",
  linkedin: "https://www.linkedin.com/in/fady-fathey-maher-72918916b/",
  email: "fadyfathymaher3@gmail.com",
  phone: "+201270644733",
} as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;
export const PROFILE_IMAGE = "/profile.svg";
