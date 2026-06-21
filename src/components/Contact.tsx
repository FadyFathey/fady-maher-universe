import React, { useState } from "react";
import {
  Send,
  Download,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSections } from "@/hooks/useSiteSections";
import { SOCIAL } from "@/config/site";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { data: sections } = useSiteSections();
  const cvSection = sections?.find((section) => section.section_key === "cv");
  const cvUrl = cvSection?.content ? (cvSection.content as { cv_url?: string }).cv_url : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      ]);

      if (error) throw error;

      toast({
        title: t("contact.success_title"),
        description: t("contact.success_desc"),
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: t("contact.error_title"),
        description: t("contact.error_desc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCvDownload = () => {
    if (!cvUrl) return;
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Fady_Fathey_Maher_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.location_val"),
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: SOCIAL.email,
      href: `mailto:${SOCIAL.email}`,
    },
    {
      icon: Phone,
      label: t("contact.phone", "Phone"),
      value: SOCIAL.phone,
      href: `tel:${SOCIAL.phone}`,
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: SOCIAL.github },
    { icon: Linkedin, label: "LinkedIn", href: SOCIAL.linkedin },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">{t("contact.send_message")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.name")} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.name_placeholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.email")} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.email_placeholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contact.message")} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.message_placeholder")}
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t("contact.sending")
                  ) : (
                    <>
                      {t("contact.send_btn")}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-fade-in">
            {cvUrl && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">{t("contact.download_cv")}</h3>
                    <p className="text-muted-foreground">{t("contact.cv_desc")}</p>
                    <Button className="w-full" onClick={handleCvDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      {t("contact.download_cv")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t("contact.contact_info")}</h3>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{t("contact.connect")}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">
                      {t("contact.available_title")}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {t("contact.available_desc")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
