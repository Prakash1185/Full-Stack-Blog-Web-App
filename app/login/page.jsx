"use client";
import React, { useState } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Redirect based on user role
      if (session.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    }
  }, [session, status, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signIn("google", {
        redirect: false, // Don't auto-redirect
      });

      if (result?.error) {
        setLoading(false);
      } else if (result?.ok) {
        // Don't show success message here - let useEffect handle the redirect
        // The loading state will continue until useEffect redirects
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Show loading state while checking session or during login
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {status === "loading"
              ? "Checking authentication..."
              : "Signing you in..."}
          </p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show loading while redirecting
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-lg mx-auto">
        {/* Login Card */}
        <Card className="shadow-lg border border-border bg-secondary-background py-8">
          <CardHeader className="text-center space-y-2">
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
              disabled={loading}
              variant=""
              className="w-full flex items-center justify-center gap-3 py-6 text-base font-medium max-w-sm mx-auto transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <RiGoogleFill className="w-5 h-5" />
                  Continue with Google
                </>
              )}
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
