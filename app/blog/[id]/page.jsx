"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getBlogById } from "@/lib/actions/blog.actions";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const SingleBlogPage = () => {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog data on component mount
  useEffect(() => {
    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching blog data for ID:", blogId);

      const result = await getBlogById(blogId);

      if (result.success) {
        // Only show approved blogs to public users
        if (!result.blog.approval) {
          setError("Blog not published yet");
          toast.error("This blog post is not yet published");
          return;
        }

        setBlog(result.blog);
        console.log("✅ Blog data loaded successfully");
      } else {
        setError(result.error || "Blog not found");
        console.error("❌ Failed to fetch blog:", result.error);
      }
    } catch (error) {
      console.error("❌ Error fetching blog:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };

  // Handle bookmark functionality (placeholder)
  const handleBookmark = () => {
    toast.info("Bookmark functionality coming soon!");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-14 sm:mt-16 md:mt-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center pt-10 sm:pt-0">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <h1 className="text-xl lg:text-2xl font-bold mb-3">Loading Blog...</h1>
          <p className="text-sm opacity-70 mb-4 sm:mb-6 px-2">
            Please wait while we fetch the blog post.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 md:py-8 mt-14 sm:mt-16 md:mt-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center pt-10 sm:pt-0">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            {error === "Blog not published yet" ? "Blog Not Published" : "Blog Not Found"}
          </h1>
          <p className="text-sm opacity-70 mb-4 sm:mb-6 px-2">
            {error === "Blog not published yet" 
              ? "This blog post is still under review and hasn't been published yet."
              : "The blog post you're looking for doesn't exist or has been removed."
            }
          </p>
          <Link href="/blogs">
            <Button className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant=""
              size="sm"
              onClick={handleBookmark}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm flex-1 sm:flex-none justify-center bg-secondary-background dark:bg-foreground"
            >
              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button
              variant=""
              size="sm"
              onClick={handleShare}
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
          <p className="text-xs sm:text-base leading-relaxed opacity-80">
            {blog.description}
          </p>
        </div>

        {/* Date and Category */}
        <div className="flex flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 opacity-70">
            <span className="font-medium">Published:</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="md:block w-[0.8px] h-6 bg-border dark:bg-foreground"></div>
          <div>
            <Badge variant="" className="text-xs capitalize">
              {blog.category}
            </Badge>
          </div>
        </div>

        {/* Banner Image */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-md sm:rounded-lg">
            <Image
              src={blog.bannerImage || "/placeholder-image.jpg"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
              onError={(e) => {
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        </div>

        {/* Blog Content - Markdown Rendered */}
        <div className="prose prose-xs sm:prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mt-8">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 mt-6">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 mt-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-4 bg-muted/20 py-2 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">
                  {children}
                </ol>
              ),
              img: ({ src, alt }) => (
                <div className="my-6">
                  <Image
                    src={src}
                    alt={alt || "Blog image"}
                    width={800}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              ),
            }}
          >
            {blog.markdown}
          </ReactMarkdown>
        </div>

        {/* Tags Section */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="border-t pt-4 sm:pt-6 md:pt-8 mb-6 sm:mb-8">
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {blog.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs sm:text-sm hover:opacity-80 transition-opacity cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blogs Footer */}
        <div className="border-t pt-6 text-center">
          <Link href="/blogs">
            <Button variant="outline" className="text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;