import React from "react";
import { Card, CardContent } from "./ui/card";
import { useSiteSections } from "@/hooks/useSiteSections";
import { useTranslation } from "react-i18next";
import { PROFILE_IMAGE } from "@/config/site";
import { getProfileImageUrl } from "@/lib/profile";

const About = () => {
  const { data: sections } = useSiteSections();
  const { t } = useTranslation();
  const aboutSection = sections?.find((s) => s.section_key === "about");

  const profileImageUrl =
    getProfileImageUrl(aboutSection?.content as { image_url?: string | null }) ||
    PROFILE_IMAGE;

  const content = {
    heading: t("about.title"),
    description: t("about.description_1"),
    experience: (aboutSection?.content as { experience?: unknown[] })?.experience || [
      {
        title: t("about.exp_title"),
        company: t("about.exp_company"),
        period: t("about.exp_period"),
        location: t("about.exp_location"),
      },
    ],
    education:
      (aboutSection?.content as { education?: string })?.education ||
      t("about.edu_degree"),
  };

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative animate-slide-up">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={profileImageUrl}
                  alt="Fady Fathey Maher - Web Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
                {content.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.description}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.description_2")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t("about.experience")}</h3>
              {content.experience?.map((exp: Record<string, string>, index: number) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{exp.period}</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("about.education")}</h3>
              <p className="text-muted-foreground">{content.education}</p>
              <p className="text-muted-foreground">{t("about.edu_cert")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
