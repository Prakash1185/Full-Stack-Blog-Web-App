"use server";

import { connectDB } from "../db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/user.model";
import { Blog } from "@/models/blog.model";
import Newsletter from "@/models/newsletter.model";
import Contact from "@/models/contact.model";

// Get dashboard statistics
export async function getDashboardStats() {
  try {
    console.log("🔄 Fetching dashboard statistics...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    // Check if user is admin
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== "admin") {
      return { success: false, error: "Admin access required" };
    }

    // Fetch all statistics in parallel using the CORRECT approval field
    const [
      totalBlogs,
      approvedBlogs,
      nonApprovedBlogs,
      totalUsers,
      newsletterSubscribers,
      contactQueries,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ approval: true }),
      Blog.countDocuments({ approval: false }),
      User.countDocuments({ role: { $ne: "admin" } }),
      Newsletter.countDocuments(),
      Contact.countDocuments(),
    ]);

    const stats = {
      totalBlogs,
      approvedBlogs,
      nonApprovedBlogs,
      totalUsers,
      newsletterSubscribers,
      contactQueries,
    };

    console.log("✅ Dashboard statistics:", stats);

    return {
      success: true,
      stats,
    };
  } catch (error) {
    console.error("❌ Dashboard Stats Error:", error);
    return {
      success: false,
      error: "Failed to fetch dashboard statistics",
      stats: {
        totalBlogs: 0,
        approvedBlogs: 0,
        nonApprovedBlogs: 0,
        totalUsers: 0,
        newsletterSubscribers: 0,
        contactQueries: 0,
      },
    };
  }
}

// Get recent blogs for dashboard
export async function getRecentBlogs(limit = 4) {
  try {
    console.log("🔄 Fetching recent blogs...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    // Check if user is admin
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== "admin") {
      return { success: false, error: "Admin access required" };
    }

    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title approval createdAt") // Fixed: using approval field
      .lean();

    // Format the blogs for frontend
    const formattedBlogs = recentBlogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      status: blog.approval ? "Approved" : "Pending", // Fixed: using approval field
      date: formatDateForDashboard(blog.createdAt),
    }));

    console.log("✅ Recent blogs fetched successfully");

    return {
      success: true,
      blogs: formattedBlogs,
    };
  } catch (error) {
    console.error("❌ Recent Blogs Error:", error);
    return {
      success: false,
      error: "Failed to fetch recent blogs",
      blogs: [],
    };
  }
}

// Helper function to format date for dashboard
function formatDateForDashboard(date) {
  const now = new Date();
  const blogDate = new Date(date);
  const diffTime = Math.abs(now - blogDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 14) return "1 week ago";
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays <= 60) return "1 month ago";
  return `${Math.ceil(diffDays / 30)} months ago`;
}
