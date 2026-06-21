export type PartnerRecord = {
  id: string;
  company_name: string;
  logo_url: string;
  website_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string | null;
};

export const PARTNER_LOGOS_BUCKET = "partner-logos";

export function normalizePartner(raw: Record<string, unknown>): PartnerRecord {
  return {
    id: String(raw.id ?? ""),
    company_name: String(raw.company_name ?? ""),
    logo_url: String(raw.logo_url ?? ""),
    website_url: (raw.website_url as string | null) ?? null,
    display_order: Number(raw.display_order ?? 0),
    is_active: raw.is_active !== false,
    created_at: (raw.created_at as string | null) ?? null,
  };
}

export function sortPartners(partners: PartnerRecord[]): PartnerRecord[] {
  return [...partners].sort((a, b) => {
    if (a.display_order !== b.display_order) {
      return a.display_order - b.display_order;
    }
    return (
      new Date(a.created_at ?? 0).getTime() -
      new Date(b.created_at ?? 0).getTime()
    );
  });
}

export function getActivePartners(partners: PartnerRecord[]): PartnerRecord[] {
  return sortPartners(partners.filter((partner) => partner.is_active));
}
