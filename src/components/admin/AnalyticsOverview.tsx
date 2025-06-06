
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, FolderOpen, FileText, TrendingUp } from 'lucide-react';

const AnalyticsOverview = () => {
  // Fetch projects analytics
  const { data: projectsData = [] } = useQuery({
    queryKey: ['projects-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('views');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch blogs analytics
  const { data: blogsData = [] } = useQuery({
    queryKey: ['blogs-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('views');
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate metrics
  const totalProjects = projectsData.length;
  const totalProjectViews = projectsData.reduce((sum, project) => sum + (project.views || 0), 0);
  const totalBlogs = blogsData.length;
  const totalBlogViews = blogsData.reduce((sum, blog) => sum + (blog.views || 0), 0);

  const metrics = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      description: "Published projects"
    },
    {
      title: "Total Project Views",
      value: totalProjectViews,
      icon: Eye,
      description: "Cumulative project views"
    },
    {
      title: "Total Blog Posts", 
      value: totalBlogs,
      icon: FileText,
      description: "Published blog posts"
    },
    {
      title: "Total Blog Views",
      value: totalBlogViews,
      icon: TrendingUp,
      description: "Cumulative blog views"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnalyticsOverview;
