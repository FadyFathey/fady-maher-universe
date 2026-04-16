
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCVSection = () => {
  return useQuery({
    queryKey: ['cv-section'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .eq('section_key', 'cv')
        .single();
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUploadCV = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      // Upload file to storage
      const fileName = `fady-cv-${Date.now()}.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cv-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('cv-files')
        .getPublicUrl(fileName);

      // Update CV section with new URL
      const { error: updateError } = await supabase
        .from('site_sections')
        .update({
          content: {
            heading: "My Resume",
            description: "Download my latest CV to learn more about my professional experience and qualifications.",
            cv_url: urlData.publicUrl,
            show_preview: true,
            download_text: "Download CV",
            google_drive_preview_url: null
          },
          updated_at: new Date().toISOString()
        })
        .eq('section_key', 'cv');

      if (updateError) throw updateError;

      return { fileName, publicUrl: urlData.publicUrl };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv-section'] });
      queryClient.invalidateQueries({ queryKey: ['site-sections'] });
      toast({
        title: "Success",
        description: "CV uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload CV",
        variant: "destructive",
      });
      console.error('CV upload error:', error);
    }
  });
};

export const useUpdateCVSection = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from('site_sections')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cv-section'] });
      queryClient.invalidateQueries({ queryKey: ['site-sections'] });
      toast({
        title: "Success",
        description: "CV section updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update CV section",
        variant: "destructive",
      });
      console.error('CV update error:', error);
    }
  });
};
