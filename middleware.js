import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    console.log("🔍 Middleware Debug:", {
      pathname,
      hasToken: !!token,
      userRole: token?.role,
      userEmail: token?.email
    });

    // If user is authenticated and tries to access login page, redirect them
    if (token && pathname === "/login") {
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Handle profile routes based on user role
    if (pathname.startsWith("/profile")) {
      if (!token) {
        console.log("❌ No token for profile access, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // If admin tries to access user profile, redirect to admin profile
      if (token.role === "admin") {
        return NextResponse.redirect(new URL("/admin/profile", req.url));
      }
    }

    // Handle admin profile route
    if (pathname === "/admin/profile") {
      if (!token) {
        console.log("❌ No token for admin profile access, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token.role !== "admin") {
        console.log("❌ Non-admin trying to access admin profile, redirecting to user profile");
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }

    // Protect other admin routes - require admin role
    if (pathname.startsWith("/admin") && pathname !== "/admin/profile") {
      if (!token) {
        console.log("❌ No token for admin access, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (token.role !== "admin") {
        console.log("❌ Non-admin trying to access admin routes, redirecting to home");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    console.log("✅ Middleware allowing access to:", pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        console.log("🔍 Authorized callback:", {
          pathname,
          hasToken: !!token,
          userRole: token?.role
        });

        // Allow access to login page for everyone
        if (pathname === "/login") {
          return true;
        }

        // For protected routes, require authentication
        if (pathname.startsWith("/profile") || pathname.startsWith("/admin")) {
          return !!token;
        }

        // Allow access to all other pages
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/login",
    "/profile/:path*",
    "/admin/:path*"
  ],
};