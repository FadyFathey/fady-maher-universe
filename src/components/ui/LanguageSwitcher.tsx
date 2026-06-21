import { useTranslation } from "react-i18next";
import { Button } from "./button";
import { Languages } from "lucide-react";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border shadow-sm"
      title={i18n.language === "en" ? "Change to Arabic" : "????? ??????????"}
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle Language</span>
    </Button>
  );
};
