"use client";
import React, { useState, useEffect, useMemo } from "react";
import BlogCard from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, Loader2, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import {
  getBlogsByCategory,
  getBlogCategories,
} from "@/lib/actions/blog.actions";
import { toast } from "sonner";

const SingleCategoryBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const params = useParams();
  const slug = params.slug;

  // Convert slug back to category name (capitalize first letter)
  const categoryName = slug?.charAt(0).toUpperCase() + slug?.slice(1);

  // Fetch category blogs and other categories on component mount
  useEffect(() => {
    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);

      // Fetch blogs for this category and all categories
      const [blogsResult, categoriesResult] = await Promise.all([
        getBlogsByCategory(slug),
        getBlogCategories(),
      ]);

      if (blogsResult.success) {
        setBlogs(blogsResult.blogs);
      } else {
        // toast.error(blogsResult.error || "Failed to fetch blogs");
        setBlogs([]);
      }

      if (categoriesResult.success) {
        setCategories(categoriesResult.categories);
       
      } else {
        setCategories([]);
      }

      if (blogsResult.success) {
        toast.success(
          // `Loaded ${blogsResult.blogs.length} ${categoryName} blogs!`
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred while fetching data");
      setBlogs([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategoryData();
    setRefreshing(false);
  };

  // Get current category data for blog count
  const categoryData = categories.find(
    (cat) => cat.category.toLowerCase() === slug?.toLowerCase()
  );

  // Filter blogs by search term
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        searchTerm === "" ||
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    });
  }, [blogs, searchTerm]);

  // Get other categories for suggestions (exclude current category)
  const otherCategories = useMemo(() => {
    return categories
      .filter((cat) => cat.category.toLowerCase() !== slug?.toLowerCase())
      .slice(0, 4);
  }, [categories, slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
        <div className="">
          <div className="mb-4 md:mb-6">
            <Link href="/category">
              <Button
                variant=""
                size="sm"
                className="flex items-center gap-1 text-sm hover:opacity-80 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              {categoryName}
            </h1>
            <p className="text-sm md:text-base max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
              Explore our collection of {categoryName?.toLowerCase()} blogs and
              stay updated.
            </p>
          </div>

          <div className="text-center py-8 md:py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm opacity-70">
              Loading {categoryName} blogs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
      <div className="">
        {/* Breadcrumb / Back Button */}
        <div className="mb-4 md:mb-6">
          <Link href="/category">
            <Button
              variant=""
              size="sm"
              className="flex items-center gap-1 text-sm hover:opacity-80 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {categoryName}
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="hidden sm:flex"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>
            <Badge variant="secondary" className="text-xs md:text-sm">
              {categoryData?.blogCount || filteredBlogs.length} articles
            </Badge>
          </div>
          <p className="text-sm md:text-base max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
            Explore our collection of {categoryName?.toLowerCase()} blogs and
            stay updated.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50 w-4 h-4" />
            <Input
              type="text"
              placeholder={`Search in ${categoryName?.toLowerCase()}...`}
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

          {/* Mobile refresh button */}
          <div className="flex justify-center mt-3 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="text-sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-center mb-4">
          <p className="text-xs md:text-sm opacity-70">
            Showing {filteredBlogs.length} of {blogs.length} approved{" "}
            {categoryName?.toLowerCase()} blogs
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 pb-10">
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
          // No Results State
          <div className="text-center py-8 mb-8">
            <div className="max-w-sm md:max-w-md mx-auto px-4">
              <div className="opacity-50 mb-4">
                <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                No blogs found
              </h3>
              <p className="text-sm opacity-70 mb-4 leading-relaxed">
                {searchTerm
                  ? `No ${categoryName?.toLowerCase()} articles match "${searchTerm}"`
                  : blogs.length === 0
                  ? `We don't have any published ${categoryName?.toLowerCase()} articles yet.`
                  : `No ${categoryName?.toLowerCase()} articles found.`}
              </p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  variant=""
                  size="sm"
                  className="mb-4 cursor-pointer"
                >
                  Clear Search
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Other Categories Section */}
        {otherCategories.length > 0 && (
          <div className="border-t border-border pt-8 md:pt-12">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">
                Explore Other Categories
              </h2>
              <p className="text-sm opacity-70">
                Discover more content across different topics
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
              {otherCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.category.toLowerCase()}`}
                  className="group"
                >
                  <Card className="bg-main cursor-pointer hover:shadow-lg transition-all duration-300 ease-linear">
                    <CardContent className="flex flex-col justify-center items-center text-center w-full h-full p-4">
                      <h3 className="text-sm md:text-base font-bold text-center capitalize">
                        {category.category}
                      </h3>
                      <p className="text-xs opacity-70 mt-1">
                        {category.blogCount} blogs
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCategoryBlogs;
