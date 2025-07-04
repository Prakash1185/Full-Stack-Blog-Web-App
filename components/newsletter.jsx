"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="px-16 py-16 bg-secondary-background border-t-4 border-b-4 border-border">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Text */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Stay in the loop with our newsletter
          </h2>
          <p className="text-lg leading-relaxed">
            Get the latest articles and insights delivered straight to your
            inbox
          </p>
        </div>

        {/* Email Input Form */}
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" className="font-medium px-8 cursor-pointer">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
