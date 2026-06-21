import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  getActivePartners,
  normalizePartner,
  sortPartners,
  type PartnerRecord,
} from "@/lib/partners";

async function fetchActivePartners(): Promise<PartnerRecord[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;

  return getActivePartners(
    (data ?? []).map((row) => normalizePartner(row as Record<string, unknown>))
  );
}

async function fetchAllPartners(): Promise<PartnerRecord[]> {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;

  return sortPartners(
    (data ?? []).map((row) => normalizePartner(row as Record<string, unknown>))
  );
}

function usePartnersRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("partners-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "partners" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["partners"] });
          queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

export function usePartners() {
  usePartnersRealtime();

  return useQuery({
    queryKey: ["partners"],
    queryFn: fetchActivePartners,
    staleTime: 60_000,
  });
}

export function useAdminPartners() {
  usePartnersRealtime();

  return useQuery({
    queryKey: ["admin-partners"],
    queryFn: fetchAllPartners,
  });
}
