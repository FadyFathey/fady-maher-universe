
import React from "react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";
import { useSiteSections } from "@/hooks/useSiteSections";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      "Our old website wasn't bringing any customers. Fady rebuilt it and within weeks we started getting calls and messages we never had before.",
    name: "Ahmed Hassan",
    role: "Business Owner",
    company: "Local Services Company",
  },
  {
    quote:
      "I didn't know anything about websites — Fady explained everything simply, kept me updated, and delivered exactly what my business needed.",
    name: "Mohamed Adel",
    role: "Shop Owner",
    company: "Retail Business",
  },
  {
    quote:
      "Professional, fast, and easy to work with. Our new site looks great on phones and customers tell us they found us through Google now.",
    name: "Sara Khaled",
    role: "Founder",
    company: "Startup",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  const { data: sections } = useSiteSections();

  const testimonialsSection = sections?.find(
    (s) => s.section_key === "testimonials"
  );

  const cmsTestimonials = (
    testimonialsSection?.content as { items?: Testimonial[] }
  )?.items;

  const testimonials =
    cmsTestimonials && cmsTestimonials.length > 0
      ? cmsTestimonials
      : (t("testimonials.items", {
          returnObjects: true,
        }) as Testimonial[]);

  const items =
    Array.isArray(testimonials) && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient">
            {t("testimonials.title")}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Card key={`${item.name}-${index}`} className="relative h-full">
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary/30" />

                <p className="text-muted-foreground leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div>
                  <p className="font-semibold">{item.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {item.role} · {item.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

