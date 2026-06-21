import React from "react";
import { Rocket, Layout, Gauge, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";
import { useSiteSections } from "@/hooks/useSiteSections";

const defaultServices = [
  {
    icon: Rocket,
    titleKey: "services.mvp_title",
    descKey: "services.mvp_desc",
  },
  {
    icon: Layout,
    titleKey: "services.landing_title",
    descKey: "services.landing_desc",
  },
  {
    icon: Gauge,
    titleKey: "services.audit_title",
    descKey: "services.audit_desc",
  },
];

const Services = () => {
  const { t } = useTranslation();
  const { data: sections } = useSiteSections();
  const servicesSection = sections?.find((s) => s.section_key === "services");

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            {(servicesSection?.content as { heading?: string })?.heading ||
              t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {(servicesSection?.content as { description?: string })?.description ||
              t("services.subtitle")}
          </p>
          <p className="text-sm font-medium text-primary">
            {t("services.icp")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {defaultServices.map(({ icon: Icon, titleKey, descKey }) => (
            <Card key={titleKey} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{t(titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={scrollToContact} className="group">
            {t("services.cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
