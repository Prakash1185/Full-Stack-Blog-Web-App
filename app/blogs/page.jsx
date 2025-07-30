"use client";
import React, { useState, useEffect, useMemo } from "react";
import BlogCard from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { getAllApprovedBlogs } from "@/lib/actions/blog.actions";
import { toast } from "sonner";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching approved blogs...");

      const result = await getAllApprovedBlogs();

      if (result.success) {
        setBlogs(result.blogs);
        console.log(`✅ Loaded ${result.blogs.length} approved blogs`);
        toast.success(`Loaded blogs successfully!`);
      } else {
        console.error("❌ Failed to fetch blogs:", result.error);
        toast.error(result.error || "Failed to fetch blogs");
        setBlogs([]);
      }
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      toast.error("An unexpected error occurred while fetching blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from approved blogs
  const categories = useMemo(() => {
    if (!blogs.length) return ["All"];
    const cats = ["All", ...new Set(blogs.map((blog) => blog.category))];
    return cats;
  }, [blogs]);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, blogs]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
        <div className="mx-auto">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 px-2">
              All Blogs
            </h1>
            <p className="text-sm md:text-base max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
              Discover our collection of quality articles on technology,
              development, and design.
            </p>
          </div>

          <div className="text-center py-8 md:py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm opacity-70">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
      <div className="mx-auto">
        {/* Page Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold px-2">
              All Blogs
            </h1>
          </div>
          <p className="text-sm md:text-base max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
            Discover our collection of quality articles on technology,
            development, and design.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="rounded-lg p-3 md:p-4 lg:p-6 mb-6 md:mb-8 border-border border-2 bg-card">
          {/* Search Bar */}
          <div className="relative mb-3 md:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search blogs by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 w-full text-sm md:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3 md:mb-4 md:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Categories" : "Show Categories"}
            </Button>

            <div className="flex gap-2">
              {(searchTerm || selectedCategory !== "All") && (
                <Button
                  variant=""
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm cursor-pointer flex-1"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm md:text-base font-medium">
                Filter by Category:
              </h3>
              <div className="hidden md:block">
                {(searchTerm || selectedCategory !== "All") && (
                  <Button
                    variant=""
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm cursor-pointer"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "secondary"
                  }
                  className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-1 text-xs md:text-sm capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 mb-4">
          <p className="text-xs md:text-sm opacity-70">
            Showing {filteredBlogs.length} of {blogs.length} approved blogs
            {selectedCategory !== "All" && ` in "${selectedCategory}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>

          {blogs.length > 0 && (
            <p className="text-xs opacity-50">Only published blogs are shown</p>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 pb-10">
            {filteredBlogs.map((blog) => (
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
        ) : (
          // No Results
          <div className="text-center py-8 md:py-12">
            <div className="max-w-sm md:max-w-md mx-auto px-4">
              <div className="opacity-50 mb-4">
                <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {blogs.length === 0
                  ? "No blogs published yet"
                  : "No blogs found"}
              </h3>
              <p className="text-sm opacity-70 mb-4 leading-relaxed">
                {blogs.length === 0
                  ? "There are no published blogs available at the moment. Check back later!"
                  : "We couldn't find any blogs matching your search criteria."}
              </p>
              {blogs.length > 0 && (
                <Button
                  onClick={clearFilters}
                  variant=""
                  size="sm"
                  className="text-sm md:text-base cursor-pointer"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Load More Button (Placeholder for future pagination) */}
        {filteredBlogs.length > 0 && filteredBlogs.length >= 12 && (
          <div className="text-center mt-8 md:mt-12">
            <Button
              className="px-6 md:px-8 py-3 text-sm md:text-base"
              onClick={() => toast.info("Pagination coming soon!")}
            >
              Load More Blogs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
