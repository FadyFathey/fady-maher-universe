import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/config/site";

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: string;
}

const SeoHead = ({
  title = "Fady Fathey Maher | React Engineer | High-Performance Web Apps",
  description = "React engineer building high-converting, production-ready web apps. Performance, conversion, and fast delivery for startups and product teams.",
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: SeoHeadProps) => {
  const { i18n } = useTranslation();
  const url = `${SITE_URL}${path}`;
  const lang = i18n.language === "ar" ? "ar" : "en";

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}?lang=en`} />
      <link rel="alternate" hrefLang="ar" href={`${SITE_URL}${path}?lang=ar`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === "ar" ? "ar_EG" : "en_US"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoHead;
