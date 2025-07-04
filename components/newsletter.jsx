"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // Handle newsletter signup logic here
    setEmail("");
  };

  return (
    <section className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 bg-secondary-background border-t-4 border-b-4 border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Text */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 leading-tight px-2">
            Stay in the loop with our newsletter
          </h2>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed px-4 md:px-0">
            Get the latest articles and insights delivered straight to your
            inbox
          </p>
        </div>

        {/* Email Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xs sm:max-w-md mx-auto px-4 sm:px-0"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 text-sm md:text-base"
          />
          <Button
            type="submit"
            className="font-medium px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>

        
      </div>
    </section>
  );
};

export default Newsletter;
