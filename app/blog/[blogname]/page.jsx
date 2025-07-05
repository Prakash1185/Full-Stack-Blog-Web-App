"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { sampleBlogs } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";

const SingleBlogPage = ({ params }) => {
  const { blogname } = React.use(params);

  // Find the blog by matching the slug with title
  const blog = sampleBlogs.find((blog) => {
    const blogSlug = blog.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return blogSlug === blogname;
  });

  // If blog not found
  if (!blog) {
    return (
      <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-14 sm:mt-16 md:mt-20 ">
        <div className="max-w-4xl mx-auto text-center  flex flex-col items-center pt-10 sm:pt-0">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 ">
            Blog Not Found
          </h1>
          <p className="text-sm opacity-70 mb-4 sm:mb-6 px-2">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blogs">
            <Button className="flex items-center  gap-2 text-xs sm:text-sm cursor-pointer">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Sample tags
  const tags = ["Web Development", "Technology", "Programming", "Tutorial"];

  return (
    <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-14 sm:mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex pt-5 sm:pt-0 items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
          {/* Back Button */}
          <Link href="/blogs">
            <Button
              variant=""
              size="sm"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              All Blogs
            </Button>
          </Link>

          {/* Save & Share Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 ">
            <Button
              variant=""
              size="sm"
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm flex-1 sm:flex-none justify-center bg-secondary-background dark:bg-foreground"
            >
              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button
              variant=""
              size="sm"
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm flex-1 sm:flex-none justify-center"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        {/* Blog Title */}
        <div className="mb-3 sm:mb-4">
          <h1 className="text-2xl pt-2 sm:pt-0 sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
        </div>

        {/* Blog Description */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <p className="text-xs sm:text-base leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Date and Category */}
        <div className="flex flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 opacity-70">
            <span className="font-medium">Published:</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className=" md:block w-[0.8px] h-6 bg-border dark:bg-foreground"></div>
          <div className="">
            <Badge variant="" className="text-xs">
              {blog.category}
            </Badge>
          </div>
        </div>

        {/* Banner Image */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-md sm:rounded-lg">
            <Image
              src={blog.bannerImage}
              alt={blog.title}
              fill
              className="object-cover "
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
            />
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-xs sm:prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none">
          {/* Introduction */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <p className="text-xs  sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 first-letter:text-2xl  sm:first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
              {/* Introduction content space */}
            </p>
          </div>

          {/* Main Content - Section 1 */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-base  sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              {/* Section 1 heading space */}
            </h2>
            <p className="text-xs  sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
              {/* Section 1 content space */}
            </p>
          </div>

          {/* Main Content - Section 2 */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              {/* Section 2 heading space */}
            </h2>
            <p className="text-xs  sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
              {/* Section 2 content space */}
            </p>
          </div>

          {/* Main Content - Section 3 */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-base  sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              {/* Section 3 heading space */}
            </h2>
            <p className="text-xs sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
              {/* Section 3 content space */}
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
              Conclusion
            </h2>
            <div className="bg-muted/20 rounded-md sm:rounded-lg p-3 sm:p-4 md:p-6">
              <p className="text-xs  sm:text-base md:text-lg leading-relaxed">
                {/* Conclusion content space */}
              </p>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="border-t pt-4 sm:pt-6 md:pt-8 mb-6 sm:mb-8">
          <h3 className="text-sm sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant=""
                className="text-xs sm:text-sm hover:opacity-80 transition-opacity cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
