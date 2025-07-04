import React from "react";
import BlogCard from "./blog-card";
import { sampleBlogs } from "@/data/blogs";
import { Button } from "./ui/button";
import Link from "next/link";

const LatestBlogs = () => {
 
  // Get only first 6 blogs
  const latestSixBlogs = sampleBlogs.slice(0, 6);

  return (
    <section className="bg-secondary-background border-t-4 border-border  border-b-4 px-16 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto ">
        <h2 className="text-4xl lg:text-5xl font-bold  mb-2">
          Latest Articles
        </h2>
        <p className="  leading-relaxed">
          Stay updated with the latest trends in technology, development, and
          design.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-2  mx-auto">
        {latestSixBlogs.map((blog, index) => (
          <BlogCard
            key={index}
            image={blog.bannerImage}
            title={blog.title}
            description={blog.description}
            date={blog.createdAt}
            category={blog.category}
           
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-10">
        <Link href={"/blogs"}>
          <Button className="px-8 py-6 text-lg cursor-pointer">
            View All Blogs
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
