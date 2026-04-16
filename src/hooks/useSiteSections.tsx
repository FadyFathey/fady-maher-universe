
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteSection {
  id: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  content: any;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useSiteSections = () => {
  return useQuery({
    queryKey: ['site-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order');
      
      if (error) throw error;
      return data as SiteSection[];
    }
  });
};

export const useAllSiteSections = () => {
  return useQuery({
    queryKey: ['all-site-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .order('sort_order');
      
      if (error) throw error;
      return data as SiteSection[];
    }
  });
};

export const useUpdateSiteSection = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SiteSection> }) => {
      const { error } = await supabase
        .from('site_sections')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-sections'] });
      queryClient.invalidateQueries({ queryKey: ['all-site-sections'] });
      toast({
        title: "Success",
        description: "Section updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive",
      });
    }
  });
};
