"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { categoriesData } from "@/data/categories";
import CategoryCard from "@/components/category-card";

const CategoryPage = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
      <div className=" mx-auto">
        {/* Page Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3  px-2">
            Blog Categories
          </h1>
          <p className="text-sm md:text-base  max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
            Browse our blog posts by category. Click on any category to explore
            all related blogs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-10">
          {categoriesData.map((categoryItem, index) => (
            <Link
              key={index}
              href={`/category/${categoryItem.category.toLowerCase()}`}
              className="group"
            >
              <CategoryCard
                blogCount={categoryItem.blogCount}
                key={index}
                category={categoryItem.category}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
