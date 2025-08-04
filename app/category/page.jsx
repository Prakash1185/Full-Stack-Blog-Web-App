"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import CategoryCard from "@/components/category-card";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogCategories } from "@/lib/actions/blog.actions";
import { toast } from "sonner";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const result = await getBlogCategories();

      if (result.success) {
        setCategories(result.categories);
        // toast.success(`Loaded ${result.categories.length} categories!`);
      } else {
        // toast.error(result.error || "Failed to fetch categories");
        setCategories([]);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while fetching categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  };

  // Function to create clean URL slug
  const createSlug = (category) => {
    return category
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
        <div className="mx-auto">
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 px-2">
              Blog Categories
            </h1>
            <p className="text-sm md:text-base max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
              Browse our blog posts by category. Click on any category to
              explore all related blogs.
            </p>
          </div>

          <div className="text-center py-8 md:py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm opacity-70">Loading categories...</p>
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
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2">
              Blog Categories
            </h1>
            
          </div>
          <p className="text-sm md:text-base max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
            Browse our blog posts by category. Click on any category to explore
            all related blogs.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-10">
            {categories.map((categoryItem, index) => (
              <Link
                key={index}
                href={`/category/${createSlug(categoryItem.category)}`}
                className="group"
              >
                <CategoryCard
                  blogCount={categoryItem.blogCount}
                  category={categoryItem.category}
                />
              </Link>
            ))}
          </div>
        ) : (
          // No Categories State
          <div className="text-center py-8 md:py-12">
            <div className="max-w-sm md:max-w-md mx-auto px-4">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                No categories found
              </h3>
              <p className="text-sm opacity-70 mb-4 leading-relaxed">
                There are no blog categories available at the moment.
              </p>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
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
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
