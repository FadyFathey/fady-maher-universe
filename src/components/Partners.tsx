import React from "react";
import { useTranslation } from "react-i18next";
import { usePartners } from "@/hooks/usePartners";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Skeleton } from "@/components/ui/skeleton";
import { type PartnerRecord } from "@/lib/partners";
import { cn } from "@/lib/utils";

function PartnerLogo({
  partner,
  animationDelay = 0,
  className,
}: {
  partner: PartnerRecord;
  animationDelay?: number;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "flex h-[4.5rem] w-40 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-background/70 px-6 backdrop-blur-md",
        "animate-partner-premium motion-reduce:animate-none",
        className
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <OptimizedImage
        src={partner.logo_url}
        alt={partner.company_name}
        className="max-h-9 max-w-[7.5rem] object-contain opacity-100 drop-shadow-[0_0_10px_hsl(var(--primary)/0.45)]"
        skeletonClassName="h-9 w-24 rounded"
        fallbackContent={
          <span className="text-xs font-medium text-foreground/80 truncate px-2">
            {partner.company_name}
          </span>
        }
      />
    </div>
  );

  if (partner.website_url) {
    return (
      <a
        href={partner.website_url}
        target="_blank"
        rel="noopener noreferrer"
        title={partner.company_name}
        className="shrink-0 transition-transform duration-300 ease-out hover:scale-[1.03] motion-reduce:hover:scale-100"
      >
        {content}
      </a>
    );
  }

  return <div className="shrink-0">{content}</div>;
}

function MarqueeRow({
  partners,
  reverse = false,
}: {
  partners: PartnerRecord[];
  reverse?: boolean;
}) {
  const items = [...partners, ...partners];

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "flex gap-8 py-3 will-change-transform motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {items.map((partner, index) => (
          <PartnerLogo
            key={`${partner.id}-${index}`}
            partner={partner}
            animationDelay={(index % partners.length) * 0.45}
          />
        ))}
      </div>
    </div>
  );
}

function PartnersSkeleton() {
  return (
    <section className="relative py-14 lg:py-16 overflow-hidden bg-gradient-to-b from-primary/[0.04] via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-7 w-72 max-w-full mx-auto" />
        </div>
        <div className="flex gap-8 justify-center overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[4.5rem] w-40 rounded-2xl shrink-0" />
          ))}
        </div>
      </div>
    </section>
  );
}

const Partners = () => {
  const { t } = useTranslation();
  const { data: partners = [], isLoading, isError } = usePartners();

  if (isLoading) {
    return <PartnersSkeleton />;
  }

  if (isError || partners.length === 0) {
    return null;
  }

  const useMarquee = partners.length >= 4;

  return (
    <section
      id="partners"
      className="relative py-14 lg:py-16 overflow-hidden bg-gradient-to-b from-primary/[0.04] via-background to-background"
      aria-label={t("partners.title")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10 lg:mb-12 animate-fade-in">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t("partners.eyebrow")}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-gradient">
            {t("partners.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            {t("partners.subtitle")}
          </p>
        </div>

        {useMarquee ? (
          <div className="space-y-5">
            <MarqueeRow partners={partners} />
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {partners.map((partner, index) => (
              <PartnerLogo
                key={partner.id}
                partner={partner}
                animationDelay={index * 0.5}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
