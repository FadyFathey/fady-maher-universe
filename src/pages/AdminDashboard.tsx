
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Plus, FileText, FolderOpen, User, Layout, BarChart3 } from 'lucide-react';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import ProjectsManager from '@/components/admin/ProjectsManager';
import BlogsManager from '@/components/admin/BlogsManager';
import SiteSectionsManager from '@/components/admin/SiteSectionsManager';
import CVManager from '@/components/admin/CVManager';
import AnalyticsOverview from '@/components/admin/AnalyticsOverview';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <p className="text-xs text-muted-foreground">Portfolio Management</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Portfolio Management Dashboard</CardTitle>
                <p className="text-muted-foreground">
                  Manage your projects, blog posts, CV, and site sections. Monitor your content performance with detailed analytics.
                </p>
              </CardHeader>
            </Card>

            {/* Management Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 max-w-3xl">
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="sections" className="flex items-center space-x-2">
                  <Layout className="h-4 w-4" />
                  <span>Site Sections</span>
                </TabsTrigger>
                <TabsTrigger value="cv" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>CV</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex items-center space-x-2">
                  <FolderOpen className="h-4 w-4" />
                  <span>Projects</span>
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Blog Posts</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
                    <p className="text-muted-foreground">
                      Track the performance of your projects and blog posts with real-time view statistics.
                    </p>
                  </div>
                  <AnalyticsOverview />
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-6">
                <SiteSectionsManager />
              </TabsContent>

              <TabsContent value="cv" className="space-y-6">
                <CVManager />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsManager />
              </TabsContent>

              <TabsContent value="blogs" className="space-y-6">
                <BlogsManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  );
};

export default AdminDashboard;
