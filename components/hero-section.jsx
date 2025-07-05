"use client";

import React from "react";
import BlogCard from "./blog-card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { sampleBlogs } from "@/data/blogs";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8 pb-16 gap-8 md:gap-0 mt-20 lg:mt-0 ">
      {/* LEFT SIDE - HERO TEXTS */}
      <div className="flex-1 max-w-2xl xl:max-w-4xl md:pr-8 text-center lg:text-left">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-2 tracking-tighter sm:tracking-normal">
            Blogs worth your time
          </h1>
          <h1 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tighter sm:tracking-normal">
            No noise only value
          </h1>
        </div>

        <p className="text-sm md:text-lg mb-6 md:mb-8 leading-relaxed max-w-sm sm:max-w-xl mx-auto md:mx-0">
          Explore quality markdown blogs written and curated for you. Upvote
          what matters and comment your thoughts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link href={"/blogs"}>
            <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
              Start Reading
            </Button>
          </Link>
          <Link href={"/category"}>
            <Button className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg cursor-pointer">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE - BLOG SLIDER */}
      <div className="flex-1 w-full max-w-sm md:max-w-md md:mt-8">
        <Swiper
          modules={[Autoplay]}
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
