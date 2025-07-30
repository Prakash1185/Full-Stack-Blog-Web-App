"use client";
import React, { useState, useEffect } from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { getBlogCategories } from "@/lib/actions/blog.actions";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const result = await getBlogCategories();

      if (result.success) {
        // Show only first 10 categories for homepage
        const limitedCategories = result.categories.slice(0, 10);
        setCategories(limitedCategories);
      
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Explore Categories
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0">
          Discover articles organized by topics. Find content in technology,
          development, and design.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8 md:py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm opacity-70">Loading categories...</p>
        </div>
      ) : categories.length > 0 ? (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mx-auto">
            {categories.map((categoryItem, index) => (
              <Link
                key={index}
                href={`/category/${categoryItem.category.toLowerCase()}`}
              >
                <CategoryCard
                  category={categoryItem.category}
                  blogCount={categoryItem.blogCount}
                />
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-8 md:pt-10 lg:pt-12">
            <Link href="/category">
              <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
                View All Categories
              </Button>
            </Link>
          </div>
        </>
      ) : (
        // No Categories State
        <div className="text-center py-8 md:py-12">
          <div className="max-w-md mx-auto px-4">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              No categories available
            </h3>
            <p className="text-sm opacity-70 mb-4 leading-relaxed">
              There are no blog categories available at the moment. Check back
              later!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
