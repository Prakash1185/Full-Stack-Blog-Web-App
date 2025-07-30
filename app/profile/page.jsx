"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Bookmark,
  LogOut,
  Trash2,
  Edit3,
  Save,
  X,
  Home,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  removeSavedBlog,
} from "@/lib/actions/user.actions";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState("");
  const [tempName, setTempName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch user profile data
  useEffect(() => {
    if (status === "authenticated") {
      fetchUserProfile();
    }
  }, [status]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);

      const result = await getUserProfile();

      if (result.success) {
        setUserName(result.user.name || "");
        setTempName(result.user.name || "");
        setSavedBlogs(result.user.savedBlogs || []);
      } else {
        toast.error("Failed to load profile data");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setUpdating(true);

      const result = await updateUserProfile({ name: tempName.trim() });

      if (result.success) {
        setUserName(tempName);
        setIsEditingName(false);
        toast.success("Name updated successfully");
      } else {
        toast.error(result.error || "Failed to update name");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditingName(false);
  };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);

      const result = await deleteUserAccount();

      if (result.success) {
        toast.success("Account deleted successfully");

        // Sign out and redirect
        await signOut({
          callbackUrl: "/",
          redirect: true,
        });
      } else {
        toast.error(result.error || "Failed to delete account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleRemoveSavedBlog = async (blogId) => {
    try {

      const result = await removeSavedBlog(blogId);

      if (result.success) {
        setSavedBlogs(savedBlogs.filter((blog) => blog.id !== blogId));
        toast.success("Blog removed from saved");
      } else {
        toast.error(result.error || "Failed to remove blog");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  // Show loading state while checking session or loading profile
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 mt-16 md:mt-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this shouldn't show due to useEffect redirect)
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-16 md:mt-20">
      <div className="mx-auto">
        {/* Page Header with Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Profile
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your account settings and saved content
            </p>
          </div>

          {/* Top Navigation Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/">
              <Button
                variant=""
                className="flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 cursor-pointer"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                Home
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              variant=""
              className="flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 bg-red-500 cursor-pointer"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="bg-secondary-background selection:bg-main dark:selection:text-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                    <Image
                      src={session?.user?.image || "/default-avatar.jpg"}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover border-2 border-border"
                    />
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Name</label>
                  {isEditingName ? (
                    <div className="flex gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-xs sm:text-sm"
                        placeholder="Enter your name"
                        disabled={updating}
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveName}
                        className="px-2"
                        disabled={updating}
                      >
                        {updating ? (
                          <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        ) : (
                          <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant=""
                        onClick={handleCancelEdit}
                        className="px-2 bg-secondary-background dark:bg-foreground cursor-pointer"
                        disabled={updating}
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm md:text-base">
                        {userName || session?.user?.name || "No name set"}
                      </span>
                      <Button
                        size="sm"
                        variant=""
                        onClick={() => setIsEditingName(true)}
                        className="px-2 bg-secondary-background dark:bg-foreground cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    Email
                  </label>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {session?.user?.email}
                  </div>
                </div>

                <Dialog
                  open={isDeleteModalOpen}
                  onOpenChange={setIsDeleteModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant=""
                      className="w-full flex items-center gap-2 text-xs sm:text-sm bg-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-lg md:text-xl text-destructive">
                        Delete Account
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm">
                        Are you sure you want to delete your account? This
                        action cannot be undone and will permanently remove all
                        your data including saved blogs.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button
                        variant=""
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="text-xs sm:text-sm bg-secondary-background dark:text-foreground cursor-pointer"
                        disabled={deleting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant=""
                        onClick={handleDeleteAccount}
                        className="text-xs sm:text-sm bg-red-500 cursor-pointer"
                        disabled={deleting}
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Saved Blogs */}
          <div className="lg:col-span-2">
            <Card className="bg-secondary-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Bookmark className="w-5 h-5" />
                  Saved Blogs ({savedBlogs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2">
                    {savedBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border-2 border-border rounded-lg hover:bg-muted/30 transition-colors bg-background"
                      >
                        {/* Blog Image */}
                        <div className="relative w-full sm:w-32 md:w-40 h-32 sm:h-20 md:h-24 flex-shrink-0">
                          <Image
                            src={blog.bannerImage || "/placeholder-image.jpg"}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Blog Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="space-y-2">
                              <Link href={`/blog/${blog.id}`}>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:opacity-80 transition-opacity line-clamp-2">
                                  {blog.title}
                                </h3>
                              </Link>
                              <Badge variant="" className="text-xs w-fit">
                                {blog.category}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant=""
                              onClick={() => handleRemoveSavedBlog(blog.id)}
                              className="px-2 bg-secondary-background dark:bg-foreground"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Bookmark className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-base md:text-lg font-semibold mb-2">
                      No Saved Blogs
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Start saving blogs to see them here
                    </p>
                    <Link href="/blogs">
                      <Button
                        variant=""
                        className="text-xs sm:text-sm bg-secondary-background dark:bg-foreground"
                      >
                        Browse Blogs
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
