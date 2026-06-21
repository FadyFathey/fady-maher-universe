import React from "react";
import { ArrowRight, Clock, Linkedin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useSiteSections } from "@/hooks/useSiteSections";
import { useTranslation } from "react-i18next";
import { CALENDLY_URL, SOCIAL } from "@/config/site";

const Hero = () => {
  const { data: sections } = useSiteSections();
  const { t } = useTranslation();
  const heroSection = sections?.find((s) => s.section_key === "hero");

  const calendlyUrl =
    (heroSection?.content as { calendly_url?: string })?.calendly_url ||
    CALENDLY_URL;

  const location =
    (heroSection?.content as { location?: string })?.location || "Cairo, Egypt";

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrimaryCta = () => {
    if (calendlyUrl) {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      return;
    }
    scrollToContact();
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="hero-gradient absolute inset-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="space-y-3">
            <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient tracking-tight max-w-4xl mx-auto">
              {t("hero.heading")}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("hero.subheading")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={handlePrimaryCta}
              className="w-full sm:w-auto group"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t("hero.cta_primary")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto group"
            >
              {t("hero.cta_secondary")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{t("hero.replies")}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              {t("hero.projects_shipped")}
            </span>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              {t("hero.specialist")}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{t("hero.turnaround")}</span>
            </div>
            <span className="text-border">|</span>
            <span className="font-medium">{location}</span>
          </div>

          <div className="flex items-center justify-center pt-2">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
