import React, { useEffect } from "react";
import { ArrowLeft, Calendar, Tag, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import SeoHead from "@/components/SeoHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { blogPath } from "@/lib/slugify";

const BlogPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["published-blogs", "blog-page", "with-display-order"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true);

      if (error) throw error;

      return data.sort((a, b) => {
        if (a.display_order !== null && b.display_order !== null) {
          return a.display_order - b.display_order;
        }
        if (a.display_order !== null) return -1;
        if (b.display_order !== null) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    },
    staleTime: 30000,
  });

  const selectedPost = slug
    ? blogs.find((p) => p.slug === slug || p.id === slug)
    : null;

  useEffect(() => {
    if (slug && !isLoading && blogs.length > 0 && !selectedPost) {
      navigate("/blog", { replace: true });
    }
  }, [slug, isLoading, blogs.length, selectedPost, navigate]);

  useEffect(() => {
    if (selectedPost?.id) {
      supabase.rpc("increment_blog_view", { blog_id: selectedPost.id }).catch(() => {});
    }
  }, [selectedPost?.id]);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <SeoHead
          title={`${selectedPost.title} | Fady Fathey Maher`}
          description={selectedPost.excerpt}
          path={blogPath(selectedPost.slug, selectedPost.id)}
          type="article"
        />
        <Navigation />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="ghost" asChild className="mb-8 hover:bg-accent transition-colors">
              <Link to="/blog">
                <ArrowLeft className={`mr-2 h-4 w-4 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                {t("blog.back_to_blog")}
              </Link>
            </Button>

            <article className="max-w-3xl mx-auto">
              <header className="mb-12 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground tracking-tight">
                    {selectedPost.title}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
                    {selectedPost.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-6">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={selectedPost.created_at}>
                        {new Date(selectedPost.created_at).toLocaleDateString(
                          i18n.language === "ar" ? "ar-EG" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </time>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {t("blog.min_read", {
                          count: Math.ceil(selectedPost.content?.length / 1000) || 1,
                        })}
                      </span>
                    </div>
                  </div>
                  {selectedPost.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Separator />
              </header>

              {selectedPost.image_url && (
                <div className="mb-12">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                    <OptimizedImage
                      src={selectedPost.image_url}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="article-content">
                <BlogContent content={selectedPost.content} />
              </div>

              <div className="mt-16 pt-8 border-t border-border text-center space-y-4">
                <p className="text-muted-foreground">{t("blog.post_cta")}</p>
                <Button asChild size="lg">
                  <Link to="/#contact">
                    {t("blog.post_cta_btn")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Blog | React & Frontend Insights | Fady Fathey Maher"
        description={t("blog.blog_subtitle")}
        path="/blog"
      />
      <Navigation />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gradient">
              {t("blog.blog_title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("blog.blog_subtitle")}
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-muted rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">{t("blog.no_posts_title")}</h2>
              <p className="text-muted-foreground">{t("blog.no_posts_desc")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <Link key={post.id} to={blogPath(post.slug, post.id)} className="block">
                  <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader className="p-0 relative">
                      {post.image_url ? (
                        <OptimizedImage
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                          <div className="text-primary/60 text-6xl font-bold">
                            {post.title.charAt(0)}
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className={`mr-2 h-4 w-4 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                {t("projects.back_to_portfolio")}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
