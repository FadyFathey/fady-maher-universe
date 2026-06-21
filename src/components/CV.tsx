import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useSiteSections } from "@/hooks/useSiteSections";
import { useTranslation } from "react-i18next";

const CV = () => {
  const { data: sections } = useSiteSections();
  const { t } = useTranslation();

  const cvSection = sections?.find((section) => section.section_key === "cv");

  if (!cvSection || !cvSection.content) {
    return null;
  }

  const content = cvSection.content as {
    heading?: string;
    description?: string;
    cv_url?: string;
    download_text?: string;
    google_drive_preview_url?: string;
  };
  const { heading, description, cv_url, download_text, google_drive_preview_url } = content;

  const previewUrl =
    google_drive_preview_url ||
    (cv_url?.includes("drive.google.com/file/d/")
      ? cv_url.replace("/view", "/preview").replace("/edit", "/preview")
      : null);

  if (!cv_url) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              {heading || t("contact.download_cv")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description || t("contact.cv_desc")}
            </p>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <Button asChild size="lg">
              <a href={cv_url} download>
                <Download className="h-4 w-4 mr-2" />
                {download_text || t("contact.download_cv")}
              </a>
            </Button>
          </div>

          {previewUrl && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg border shadow-lg overflow-hidden">
              <iframe
                src={previewUrl}
                width="100%"
                height="600"
                allow="autoplay"
                style={{ border: "none", borderRadius: "12px" }}
                title={t("contact.download_cv")}
              />
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CV;
