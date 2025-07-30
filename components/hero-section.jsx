"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "./blog-card";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getLatestBlogs, getLatestBlogsForHero } from "@/lib/actions/blog.actions";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const HeroSection = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest blogs on component mount
  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getLatestBlogs(5);

      if (result.success) {
        setLatestBlogs(result.blogs || []);
       
      } else {
        setError(result.error);
        setLatestBlogs([]);
      }
    } catch (error) {
      setError(error.message);
      setLatestBlogs([]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8 pb-16 gap-8 md:gap-0 mt-20 lg:mt-0">
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
          Discover insightful articles crafted to inform and spark meaningful
          conversations where every blog is worthy.
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
        {loading ? (
          <div className="flex items-center justify-center h-96 bg-secondary-background rounded-lg">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 opacity-60" />
              <p className="text-sm text-muted-foreground">
                Loading latest blogs...
              </p>
            </div>
          </div>
        ) : latestBlogs.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={latestBlogs.length > 1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full h-auto"
          >
            {latestBlogs.map((blog, index) => (
              <SwiperSlide key={blog.id || index}>
                <BlogCard
                  image={blog.bannerImage}
                  title={blog.title}
                  description={blog.description}
                  date={blog.createdAt}
                  category={blog.category}
                  id={blog._id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-96 bg-secondary-background rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl opacity-60">📝</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {error ? `Error: ${error}` : "No approved blogs available yet"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Create and approve some blogs to see them here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
