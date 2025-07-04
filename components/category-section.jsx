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
    <section className="px-16 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold mb-2">
          Explore Categories
        </h2>
        <p className=" leading-relaxed">
          Discover articles organized by topics. Find in technology,
          development, and design.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="flex justify-between flex-wrap pt-10 ">
        {categoriesData.map((categoryItem, index) => (
          <div key={index}>
            <Link href={`/category/${categoryItem.category.toLowerCase()}`}>
              <CategoryCard
                category={categoryItem.category}
                description={categoryItem.description}
                blogCount={categoryItem.blogCount}
                icon={categoryItem.icon}
                color={categoryItem.color}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-10">
        <Link href={"/blogs"}>
          <Button className="px-8 py-6 text-lg cursor-pointer">
            View Categories
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
