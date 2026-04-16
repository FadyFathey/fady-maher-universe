
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { useAllSiteSections, useUpdateSiteSection } from '@/hooks/useSiteSections';
import SiteSectionForm from './SiteSectionForm';

const SiteSectionsManager = () => {
  const { data: sections, isLoading } = useAllSiteSections();
  const updateSection = useUpdateSiteSection();
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const toggleVisibility = (id: string, currentVisibility: boolean) => {
    updateSection.mutate({
      id,
      data: { is_visible: !currentVisibility }
    });
  };

  const updateSortOrder = (id: string, newOrder: number) => {
    updateSection.mutate({
      id,
      data: { sort_order: newOrder }
    });
  };

  if (isLoading) {
    return <div>Loading sections...</div>;
  }

  if (editingSection) {
    const section = sections?.find(s => s.id === editingSection);
    if (section) {
      return (
        <SiteSectionForm
          section={section}
          onCancel={() => setEditingSection(null)}
          onSuccess={() => setEditingSection(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Site Sections</h2>
          <p className="text-muted-foreground">
            Manage all sections of your portfolio website
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {sections?.map((section, index) => (
          <Card key={section.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <Badge variant={section.is_visible ? "default" : "secondary"}>
                    {section.is_visible ? "Visible" : "Hidden"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleVisibility(section.id, section.is_visible)}
                  >
                    {section.is_visible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  {index > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSortOrder(section.id, section.sort_order - 1)}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  )}
                  {index < (sections?.length || 0) - 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSortOrder(section.id, section.sort_order + 1)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSection(section.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {section.subtitle && (
                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Section Key:</span> {section.section_key}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Sort Order:</span> {section.sort_order}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SiteSectionsManager;
