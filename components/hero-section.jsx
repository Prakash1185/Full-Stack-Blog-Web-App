"use client";

import React from "react";
import BlogCard from "./blog-card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { sampleBlogs } from "@/data/blogs";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-between px-16 ">
      {/* LEFT SIDE - HERO TEXTS */}
      <div className="flex-1 max-w-2xl xl:max-w-4xl pr-8">
        <div className="mb-6">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold  leading-tight mb-2">
            Blogs worth your time
          </h1>
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold  leading-tight">
            No noise only value
          </h1>
        </div>

        <p className="text-lg  mb-8 leading-relaxed max-w-xl">
          Explore quality markdown blogs written and curated for you. Upvote
          what matters and comment your thoughts.
        </p>

        <div className="flex gap-4">
          <Button className="px-8 py-6 text-lg">Start Reading</Button>
          <Button className="px-8 py-6 text-lg">Browse Categories</Button>
        </div>
      </div>

      {/* RIGHT SIDE - BLOG SLIDER */}
      <div className="flex-1 max-w-md">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full h-auto"
        >
          {sampleBlogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <BlogCard
                image={blog.bannerImage}
                title={blog.title}
                description={blog.description}
                date={blog.createdAt}
                category={blog.category}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
