"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-muted-foreground/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Page Not Found
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Sorry, we couldn't find the page you're looking for. 
          </p>
        </div>

       

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          

          <Link href="/">
            <Button className="w-full sm:w-auto flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </Link>

          <Link href="/blogs">
            <Button
              variant=""
              className="w-full sm:w-auto flex items-center gap-2 bg-secondary-background dark:bg-foreground cursor-pointer"
            >
              <Search className="w-4 h-4" />
              View Blogs
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
