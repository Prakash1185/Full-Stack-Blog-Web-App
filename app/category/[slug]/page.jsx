"use client";
import React, { useState, useMemo } from "react";
import BlogCard from "@/components/blog-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft } from "lucide-react";
import { sampleBlogs } from "@/data/blogs";
import { categoriesData } from "@/data/categories";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import CategoryCard from "@/components/category-card";

const SingleCategoryBlogs = ({ params }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { slug } = React.use(params);

  // Convert slug back to category name (capitalize first letter)
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Get category data for blog count
  const categoryData = categoriesData.find(
    (cat) => cat.category.toLowerCase() === slug.toLowerCase()
  );

  // Filter blogs by category and search term
  const filteredBlogs = useMemo(() => {
    return sampleBlogs.filter((blog) => {
      const matchesCategory =
        blog.category.toLowerCase() === slug.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [slug, searchTerm]);

  // Get other categories for suggestions
  const otherCategories = useMemo(() => {
    return categoriesData
      .filter((cat) => cat.category.toLowerCase() !== slug.toLowerCase())
      .slice(0, 4);
  }, [slug]);

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
      <div className="">
        {/* Breadcrumb / Back Button */}
        <div className="mb-4 md:mb-6 ">
          <Link href="/category">
            <Button
              variant=""
              size={"sm"}
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
            <Badge variant="secondary" className="text-xs md:text-sm hidden">
              {categoryData?.blogCount || filteredBlogs.length} articles
            </Badge>
          </div>
          <p className="text-sm md:text-base max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
            Explore our collection of {categoryName.toLowerCase()} blogs and
            stay updated.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50 w-4 h-4" />
            <Input
              type="text"
              placeholder={`Search in ${categoryName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full text-sm md:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 pb-10">
            {filteredBlogs.map((blog, index) => (
              <div key={index} className="flex">
                <BlogCard
                  image={blog.bannerImage}
                  title={blog.title}
                  description={blog.description}
                  date={blog.createdAt}
                  category={blog.category}
                />
              </div>
            ))}
          </div>
        ) : (
          // No Results State
          <div className="text-center py-8  mb-8 ">
            <div className="max-w-sm md:max-w-md mx-auto px-4">
              <div className="opacity-50 mb-4">
                <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                No blogs found
              </h3>
              <p className="text-sm  opacity-70 mb-4 leading-relaxed">
                {searchTerm
                  ? `No ${categoryName.toLowerCase()} articles match "${searchTerm}"`
                  : `We don't have any ${categoryName.toLowerCase()} articles yet.`}
              </p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  variant=""
                  size={"sm"}
                  className="mb-4 cursor-pointer  "
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
              <p className="text-sm  opacity-70">
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
                  <Card className="bg-main  cursor-pointer hover:shadow-lg transition-all duration-300 ease-linear">
                    <CardContent className="flex flex-col justify-center items-center text-center w-full h-full ">
                      <h3 className="text-lg  font-bold text-center">
                        {category.category}
                      </h3>
                      <p className="text-sm hidden opacity-90">
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
