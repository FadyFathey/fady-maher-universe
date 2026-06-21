import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SOCIAL } from "@/config/site";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t border-border mt-20 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Fady Fathey Maher</h3>
            <p className="text-sm text-muted-foreground">{t("footer.description")}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              {t("footer.quick_links")}
            </h4>
            <div className="space-y-2">
              <a href="/#services" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.services", "Services")}
              </a>
              <Link to="/projects" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.projects")}
              </Link>
              <a href="/#about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.about")}
              </a>
              <a href="/#contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t("nav.contact")}
              </a>
              <a href="/#contact" className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                {t("footer.get_quote")}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              {t("footer.connect")}
            </h4>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={`mailto:${SOCIAL.email}`}>
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center">
            {t("footer.made_with")}{" "}
            <Heart className="h-4 w-4 mx-1 text-red-500" fill="currentColor" />{" "}
            {t("footer.by")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
