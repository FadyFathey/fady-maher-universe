import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AboutSectionContent,
  PROFILE_IMAGES_BUCKET,
} from "@/lib/profile";
import { SiteSection } from "@/hooks/useSiteSections";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

async function fetchAboutSection(): Promise<SiteSection> {
  const { data, error } = await supabase
    .from("site_sections")
    .select("*")
    .eq("section_key", "about")
    .single();

  if (error) throw error;
  return data as SiteSection;
}

export function useAboutSection() {
  return useQuery({
    queryKey: ["about-section"],
    queryFn: fetchAboutSection,
  });
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        throw new Error("Invalid file type");
      }

      const aboutSection = await fetchAboutSection();
      const existingContent = (aboutSection.content as AboutSectionContent) || {};

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `profile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(PROFILE_IMAGES_BUCKET)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(PROFILE_IMAGES_BUCKET)
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("site_sections")
        .update({
          content: {
            ...existingContent,
            image_url: urlData.publicUrl,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("section_key", "about");

      if (updateError) throw updateError;

      return urlData.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-section"] });
      queryClient.invalidateQueries({ queryKey: ["site-sections"] });
      queryClient.invalidateQueries({ queryKey: ["all-site-sections"] });
      toast({
        title: "Success",
        description: "Profile image uploaded successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error && error.message === "Invalid file type"
            ? "Please upload a JPG, PNG, WebP, or SVG image"
            : "Failed to upload profile image",
        variant: "destructive",
      });
      console.error("Profile image upload error:", error);
    },
  });
}

export function useRemoveProfileImage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const aboutSection = await fetchAboutSection();
      const existingContent = (aboutSection.content as AboutSectionContent) || {};

      const { error } = await supabase
        .from("site_sections")
        .update({
          content: {
            ...existingContent,
            image_url: null,
          },
          updated_at: new Date().toISOString(),
        })
        .eq("section_key", "about");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-section"] });
      queryClient.invalidateQueries({ queryKey: ["site-sections"] });
      queryClient.invalidateQueries({ queryKey: ["all-site-sections"] });
      toast({
        title: "Success",
        description: "Profile image removed. The default image is now shown.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove profile image",
        variant: "destructive",
      });
      console.error("Profile image remove error:", error);
    },
  });
}
