import React from "react";
import BlogCard from "./blog-card";
import { sampleBlogs } from "@/data/blogs";
import { Button } from "./ui/button";
import Link from "next/link";

const LatestBlogs = () => {
  // Get only first 6 blogs
  const latestSixBlogs = sampleBlogs.slice(0, 6);

  return (
    <section className="bg-secondary-background border-t-4 border-border border-b-4  px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ">
          Latest Blogs
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed px-4 md:px-0">
          Stay updated with the latest trends in technology, development, and
          design.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
        {latestSixBlogs.map((blog, index) => (
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

      {/* View All Button */}
      <div className="text-center pt-8 md:pt-10 lg:pt-12">
        <Link href={"/blogs"}>
          <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
            View All Blogs
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
