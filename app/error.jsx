"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Error = ({ error, reset }) => {
  const handleReportError = () => {
    // You can implement error reporting logic here
    alert("Error reported successfully! We'll look into it.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Error Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-destructive/10 rounded-full">
            <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-destructive animate-pulse" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            We encountered an unexpected error. Please try again later.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
         

          <Link href="/">
            <Button
              variant=""
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </Link>

          
        </div>

       
      </div>
    </div>
  );
};

export default Error;
