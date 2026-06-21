import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PARTNER_LOGOS_BUCKET, type PartnerRecord } from "@/lib/partners";

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  partner?: PartnerRecord | null;
  nextDisplayOrder?: number;
}

const PartnerForm: React.FC<PartnerFormProps> = ({
  isOpen,
  onClose,
  partner,
  nextDisplayOrder = 0,
}) => {
  const [formData, setFormData] = useState({
    company_name: "",
    website_url: "",
    display_order: "",
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (partner) {
      setFormData({
        company_name: partner.company_name || "",
        website_url: partner.website_url || "",
        display_order: String(partner.display_order ?? ""),
        is_active: partner.is_active !== false,
      });
      setImagePreview(partner.logo_url || "");
    } else {
      setFormData({
        company_name: "",
        website_url: "",
        display_order: String(nextDisplayOrder),
        is_active: true,
      });
      setImagePreview("");
    }
    setImageFile(null);
  }, [partner, isOpen, nextDisplayOrder]);

  const uploadLogo = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `partner-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(PARTNER_LOGOS_BUCKET)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(PARTNER_LOGOS_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      let logoUrl = partner?.logo_url || "";

      if (imageFile) {
        setUploading(true);
        logoUrl = await uploadLogo(imageFile);
        setUploading(false);
      }

      if (!logoUrl) {
        throw new Error("Logo is required");
      }

      const payload = {
        company_name: formData.company_name.trim(),
        logo_url: logoUrl,
        website_url: formData.website_url.trim() || null,
        display_order: formData.display_order
          ? parseInt(formData.display_order, 10)
          : nextDisplayOrder,
        is_active: formData.is_active,
      };

      if (partner?.id) {
        const { error } = await supabase
          .from("partners")
          .update(payload)
          .eq("id", partner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("partners").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: partner
          ? "Partner updated successfully"
          : "Partner created successfully",
      });
      onClose();
    },
    onError: () => {
      setUploading(false);
      toast({
        title: "Error",
        description: "Failed to save partner",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{partner ? "Edit Partner" : "Add New Partner"}</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name *</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) =>
                setFormData({ ...formData, company_name: e.target.value })
              }
              placeholder="Acme Inc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL (optional)</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              min="0"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({ ...formData, display_order: e.target.value })
              }
              placeholder="0, 1, 2..."
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first in the logo strip.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_file">
              Logo Image {!partner && "*"}
            </Label>
            <Input
              id="logo_file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!partner && !imagePreview}
            />
            {imagePreview && (
              <div className="rounded-lg border bg-muted/30 p-6 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Logo preview"
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />
            <Label htmlFor="is_active">Active on public site</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending || uploading}>
              {(mutation.isPending || uploading) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {partner ? "Update" : "Create"} Partner
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default PartnerForm;
