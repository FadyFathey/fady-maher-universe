import React from "react";
import { Loader2, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROFILE_IMAGE } from "@/config/site";
import {
  useAboutSection,
  useRemoveProfileImage,
  useUploadProfileImage,
} from "@/hooks/useProfileImage";
import { getProfileImageUrl } from "@/lib/profile";

const ProfileImageManager = () => {
  const { data: aboutSection, isLoading } = useAboutSection();
  const uploadProfileImage = useUploadProfileImage();
  const removeProfileImage = useRemoveProfileImage();

  const customImageUrl = getProfileImageUrl(
    aboutSection?.content as { image_url?: string | null } | undefined
  );
  const displayImageUrl = customImageUrl || PROFILE_IMAGE;
  const isUsingDefault = !customImageUrl;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfileImage.mutateAsync(file);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      event.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (isUsingDefault) return;

    try {
      await removeProfileImage.mutateAsync();
    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Image
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage the profile photo shown in the About section on the Home page.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
          <div className="space-y-2">
            <Label>Current Image</Label>
            <div className="aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl border bg-muted/30">
              <img
                src={displayImageUrl}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {isUsingDefault
                ? "Using the default site image."
                : "Custom image is live on the Home page."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-image-file">
                {customImageUrl ? "Replace Image" : "Upload Image"}
              </Label>
              <Input
                id="profile-image-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={handleFileChange}
                disabled={uploadProfileImage.isPending || removeProfileImage.isPending}
              />
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP, or SVG. Removing the image restores the default.
              </p>
              {uploadProfileImage.isPending && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading profile image...
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={handleRemove}
              disabled={
                isUsingDefault ||
                uploadProfileImage.isPending ||
                removeProfileImage.isPending
              }
            >
              {removeProfileImage.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Remove Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileImageManager;
