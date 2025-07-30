"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./blog-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getLatestBlogs } from "@/lib/actions/blog.actions";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest blogs on component mount
  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching latest blogs...");

      const result = await getLatestBlogs(6); // Get 6 latest blogs

      if (result.success) {
        setBlogs(result.blogs);
        console.log(`✅ Loaded ${result.blogs.length} latest blogs`);
      } else {
        console.error("❌ Failed to fetch latest blogs:", result.error);
        setBlogs([]);
      }
    } catch (error) {
      console.error("❌ Error fetching latest blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-secondary-background border-t-4 border-border border-b-4 px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Latest Blogs
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0">
          Stay updated with the latest trends in technology, development, and
          design.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8 md:py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm opacity-70">Loading latest blogs...</p>
        </div>
      ) : blogs.length > 0 ? (
        <>
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex">
                <BlogCard
                  id={blog._id}
                  image={blog.bannerImage}
                  title={blog.title}
                  description={blog.description}
                  date={blog.createdAt}
                  category={blog.category}
                  tags={blog.tags}
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-8 md:pt-10 lg:pt-12">
            <Link href="/blogs">
              <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
                View All Blogs
              </Button>
            </Link>
          </div>
        </>
      ) : (
        // No Blogs State
        <div className="text-center py-8 md:py-12">
          <div className="max-w-md mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              No blogs available
            </h3>
            <p className="text-sm opacity-70 mb-4 leading-relaxed">
              There are no published blogs available at the moment. Check back
              later!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestBlogs;
