import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Building2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminPartners } from "@/hooks/usePartners";
import { type PartnerRecord } from "@/lib/partners";
import PartnerForm from "./PartnerForm";

const PartnersManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerRecord | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: partners = [], isLoading } = useAdminPartners();

  const nextDisplayOrder =
    partners.length > 0
      ? Math.max(...partners.map((p) => p.display_order)) + 1
      : 0;

  const toggleActiveMutation = useMutation({
    mutationFn: async ({
      partnerId,
      isActive,
    }: {
      partnerId: string;
      isActive: boolean;
    }) => {
      const { error } = await supabase
        .from("partners")
        .update({ is_active: isActive })
        .eq("id", partnerId);

      if (error) throw error;
      return { partnerId, isActive };
    },
    onSuccess: ({ isActive }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: `Partner is now ${isActive ? "active" : "inactive"}.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update partner status",
        variant: "destructive",
      });
    },
  });

  const deletePartnerMutation = useMutation({
    mutationFn: async (partnerId: string) => {
      const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", partnerId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive",
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async ({
      partnerId,
      direction,
    }: {
      partnerId: string;
      direction: "up" | "down";
    }) => {
      const index = partners.findIndex((p) => p.id === partnerId);
      if (index === -1) throw new Error("Partner not found");

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= partners.length) return;

      const current = partners[index];
      const adjacent = partners[swapIndex];

      const { error: error1 } = await supabase
        .from("partners")
        .update({ display_order: adjacent.display_order })
        .eq("id", current.id);

      if (error1) throw error1;

      const { error: error2 } = await supabase
        .from("partners")
        .update({ display_order: current.display_order })
        .eq("id", adjacent.id);

      if (error2) throw error2;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reorder partners",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (partner: PartnerRecord) => {
    setEditingPartner(partner);
    setIsFormOpen(true);
  };

  const handleDelete = (partnerId: string) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      deletePartnerMutation.mutate(partnerId);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPartner(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/3 mb-2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Partners Management</h2>
          <p className="text-muted-foreground">
            Manage client and partner logos shown in the Trusted By section
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingPartner(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      {partners.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No partners yet</h3>
                <p className="text-muted-foreground">
                  Add your first client or partner logo to build trust on your
                  homepage
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingPartner(null);
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Partner
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {partners.map((partner, index) => (
            <Card key={partner.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="h-14 w-28 shrink-0 rounded-md border bg-muted/30 flex items-center justify-center p-2">
                      <img
                        src={partner.logo_url}
                        alt={partner.company_name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {partner.company_name}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {partner.created_at
                            ? new Date(partner.created_at).toLocaleDateString()
                            : "—"}
                        </div>
                        <Badge variant="outline">
                          Order: {partner.display_order}
                        </Badge>
                        <Badge
                          variant={
                            partner.is_active ? "default" : "destructive"
                          }
                        >
                          {partner.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        reorderMutation.mutate({
                          partnerId: partner.id,
                          direction: "up",
                        })
                      }
                      disabled={index === 0 || reorderMutation.isPending}
                      title="Move up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        reorderMutation.mutate({
                          partnerId: partner.id,
                          direction: "down",
                        })
                      }
                      disabled={
                        index === partners.length - 1 ||
                        reorderMutation.isPending
                      }
                      title="Move down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        toggleActiveMutation.mutate({
                          partnerId: partner.id,
                          isActive: !partner.is_active,
                        })
                      }
                      disabled={toggleActiveMutation.isPending}
                      title={
                        partner.is_active ? "Deactivate" : "Activate"
                      }
                    >
                      {partner.is_active ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(partner.id)}
                      disabled={deletePartnerMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {partner.website_url && (
                <CardContent className="pt-0">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      <PartnerForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        partner={editingPartner}
        nextDisplayOrder={nextDisplayOrder}
      />
    </div>
  );
};

export default PartnersManager;
