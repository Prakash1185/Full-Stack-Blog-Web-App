"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { RiGoogleFill } from "@remixicon/react";

const Login = () => {
  const handleGoogleLogin = () => {
    // Google OAuth logic will go here
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-lg  mx-auto">
        {/* Login Card */}
        <Card className="shadow-lg border border-border bg-secondary-background py-8">
          <CardHeader className="text-center space-y-2 ">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              variant=""
              className="w-full flex items-center justify-center gap-3 py-6 text-base font-medium max-w-sm mx-auto transition-colors cursor-pointer"
            >
              <RiGoogleFill className="w-5 h-5" />
              Continue with Google
            </Button>

            {/* Terms and Privacy */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                By continuing, you agree to our{" "}
                <Link
                  href="/"
                  className="underline hover:opacity-80 transition-opacity"
                >
                  Terms of Service
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
};

export default Login;
