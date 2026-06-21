import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useSiteSections } from "@/hooks/useSiteSections";
import { CALENDLY_URL } from "@/config/site";

const MobileCtaBar = () => {
  const { t } = useTranslation();
  const { data: sections } = useSiteSections();
  const heroSection = sections?.find((s) => s.section_key === "hero");
  const calendlyUrl =
    (heroSection?.content as { calendly_url?: string })?.calendly_url ||
    CALENDLY_URL;

  const handleClick = () => {
    if (calendlyUrl) {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const contact = document.querySelector("#contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <Button className="w-full" size="lg" onClick={handleClick}>
        <Calendar className="mr-2 h-4 w-4" />
        {t("hero.cta_primary")}
      </Button>
    </div>
  );
};

export default MobileCtaBar;
