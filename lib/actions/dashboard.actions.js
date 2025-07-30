"use server";

import { Blog } from "@/models/blog.model";
import Contact from "@/models/contact.model";
import Newsletter from "@/models/newsletter.model";
import { connectDB } from "../db/db";

// Get dashboard statistics
export async function getDashboardStats() {
  try {
    await connectDB();

    // Fetch all statistics in parallel
    const [
      totalBlogs,
      approvedBlogs,
      nonApprovedBlogs,
      newsletterSubscribers,
      contactQueries,
      totalUsers,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: "approved" }),
      Blog.countDocuments({ status: { $ne: "approved" } }),
      Newsletter.countDocuments(),
      Contact.countDocuments(),
    //   User.countDocuments(),
    ]);


    // return {
    //   success: true,
    //   stats: {
    //     totalBlogs,
    //     approvedBlogs,
    //     nonApprovedBlogs,
    //     newsletterSubscribers,
    //     contactQueries,
    //     totalUsers, // User related code commented out
    //   },
    // };

    return {
      success: true,
      stats: {
        totalBlogs,
        approvedBlogs,
        nonApprovedBlogs,
        newsletterSubscribers,
        contactQueries,
        // totalUsers, // User related code commented out
      },
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to fetch dashboard statistics",
      stats: {
        totalBlogs: 0,
        approvedBlogs: 0,
        nonApprovedBlogs: 0,
        newsletterSubscribers: 0,
        contactQueries: 0,
        totalUsers: 0,
      },
    };
  }
}

// Get recent blogs for dashboard
export async function getRecentBlogs(limit = 4) {
  try {
    await connectDB();

    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title status createdAt")
      .lean();

    // Format the blogs for frontend
    const formattedBlogs = recentBlogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      status: blog.status === "approved" ? "Approved" : "Pending",
      date: formatDateForDashboard(blog.createdAt),
    }));

    return {
      success: true,
      blogs: formattedBlogs,
    };
  } catch (err) {
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
