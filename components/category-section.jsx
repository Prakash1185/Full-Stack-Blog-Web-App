import React from "react";
import CategoryCard from "./category-card";
import Link from "next/link";
import { Button } from "./ui/button";

// Sample categories data
const categoriesData = [
  {
    category: "Technology",
    blogCount: 24,
  },
  {
    category: "Lifestyle",
    blogCount: 24,
  },
  {
    category: "Fashion",
    blogCount: 24,
  },
  {
    category: "Gaming",
    blogCount: 24,
  },
  {
    category: "Cooking",
    blogCount: 24,
  },
];

const CategorySection = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ">
          Explore Categories
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0">
          Discover articles organized by topics. Find in technology,
          development, and design.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6  mx-auto">
        {categoriesData.map((categoryItem, index) => (
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
        <Link href={"/categories"}>
          <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
            View All Categories
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
