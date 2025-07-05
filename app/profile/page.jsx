"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState("John Doe");
  const [tempName, setTempName] = useState(userName);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Modern CSS Techniques for Better UI",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Understanding React Server Components",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Advanced TypeScript Patterns",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    },
    {
      id: 5,
      title: "Building Scalable Node.js Applications",
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    },
    {
      id: 6,
      title: "Mastering Database Design",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop",
    },
  ]);

  // Sample user data
  const userEmail = "john.doe@example.com";
  const userAvatar =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";

  const handleSaveName = () => {
    setUserName(tempName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditingName(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Logout logic will go here
  };

  const handleDeleteAccount = () => {
    console.log("Delete account confirmed");
    setIsDeleteModalOpen(false);
    // Delete account logic will go here
  };

  const removeSavedBlog = (blogId) => {
    setSavedBlogs(savedBlogs.filter((blog) => blog.id !== blogId));
  };

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-16  md:mt-20">
      <div className=" mx-auto">
        {/* Page Header with Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ">
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
                      src={userAvatar}
                      alt="Profile"
                      fill
                      className="rounded-full object-cover border-2 border-border"
                    />
                  </div>
                  <Button
                    variant=""
                    size="sm"
                    className="text-xs sm:text-sm bg-secondary-background  dark:bg-foreground cursor-pointer"
                  >
                    Change Photo
                  </Button>
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
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveName}
                        className="px-2"
                      >
                        <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant=""
                        onClick={handleCancelEdit}
                        className="px-2 bg-secondary-background dark:bg-foreground cursor-pointer"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm md:text-base">
                        {userName}
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
                    {userEmail}
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
                      >
                        Cancel
                      </Button>
                      <Button
                        variant=""
                        onClick={handleDeleteAccount}
                        className="text-xs sm:text-sm bg-red-500 cursor-pointer"
                      >
                        Delete
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
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Blog Info */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="space-y-2">
                              <Link
                                href={`/blog/${blog.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                                  .replace(/[^\w-]/g, "")}`}
                              >
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold hover:opacity-80 transition-opacity line-clamp-2">
                                  {blog.title}
                                </h3>
                              </Link>
                              <Badge
                                variant=""
                                className="text-xs w-fit"
                              >
                                {blog.category}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant=""
                              onClick={() => removeSavedBlog(blog.id)}
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
                      <Button variant="" className="text-xs sm:text-sm bg-secondary-background dark:bg-foreground">
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
