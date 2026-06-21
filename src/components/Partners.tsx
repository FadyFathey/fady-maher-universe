import React from "react";
import { useTranslation } from "react-i18next";
import { usePartners } from "@/hooks/usePartners";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Skeleton } from "@/components/ui/skeleton";
import { type PartnerRecord } from "@/lib/partners";
import { cn } from "@/lib/utils";

function PartnerLogo({
  partner,
  className,
}: {
  partner: PartnerRecord;
  className?: string;
}) {
  const content = (
    <div
      className={cn(
        "group flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background/60 px-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-background hover:shadow-sm",
        className
      )}
    >
      <OptimizedImage
        src={partner.logo_url}
        alt={partner.company_name}
        className="max-h-8 max-w-[7rem] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        skeletonClassName="h-8 w-24 rounded"
        fallbackContent={
          <span className="text-xs text-muted-foreground truncate px-2">
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
        className="shrink-0"
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
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn(
          "flex gap-6 py-2",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {items.map((partner, index) => (
          <PartnerLogo
            key={`${partner.id}-${index}`}
            partner={partner}
          />
        ))}
      </div>
    </div>
  );
}

function PartnersSkeleton() {
  return (
    <section className="py-16 lg:py-24 border-y border-border/50 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
        </div>
        <div className="flex gap-6 justify-center overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-36 rounded-xl shrink-0" />
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
  const firstRow = useMarquee
    ? partners.filter((_, i) => i % 2 === 0)
    : partners;
  const secondRow = useMarquee
    ? partners.filter((_, i) => i % 2 === 1)
    : [];

  return (
    <section
      id="partners"
      className="py-16 lg:py-24 border-y border-border/50 bg-muted/10 overflow-hidden"
      aria-label={t("partners.title")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 lg:mb-14 animate-fade-in">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/80">
            {t("partners.eyebrow")}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
            {t("partners.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("partners.subtitle")}
          </p>
        </div>

        {useMarquee ? (
          <div className="space-y-4">
            <MarqueeRow partners={firstRow} />
            {secondRow.length > 0 && (
              <MarqueeRow partners={secondRow} reverse />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {partners.map((partner) => (
              <PartnerLogo key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
