"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "../db/db";
import User from "@/models/user.model";
import Blog from "@/models/user.model";

// Get user profile with saved blogs
export async function getUserProfile() {
  try {
    console.log("🔄 Getting user profile...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).populate({
      path: "savedBlogs",
      select: "title description bannerImage category createdAt _id",
      match: { approval: true }, // Only show approved blogs
      options: { sort: { createdAt: -1 } }, // Sort by newest first
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Format the saved blogs to match your UI expectations
    const formattedSavedBlogs = user.savedBlogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      bannerImage: blog.bannerImage,
      category: blog.category,
      createdAt: blog.createdAt,
    }));

    console.log("✅ User profile retrieved successfully");
    console.log(`📚 Found ${formattedSavedBlogs.length} saved blogs`);

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        savedBlogs: formattedSavedBlogs,
      },
    };
  } catch (error) {
    console.error("❌ Get User Profile Error:", error);
    return { success: false, error: "Failed to get user profile" };
  }
}

// Save a blog
export async function saveBlog(blogId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Please login to save blogs",
      };
    }

    await connectDB();

    // Check if blog exists and is approved
    const blog = await Blog.findOne({ _id: blogId, status: "approved" });
    if (!blog) {
      return {
        success: false,
        error: "Blog not found or not approved",
      };
    }

    // Find user and check if blog is already saved
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    if (user.savedBlogs.includes(blogId)) {
      return {
        success: false,
        error: "Blog already saved",
      };
    }

    // Add blog to saved blogs
    user.savedBlogs.push(blogId);
    await user.save();

    console.log("✅ Blog saved successfully");
    return {
      success: true,
      message: "Blog saved successfully",
    };
  } catch (err) {
    console.error("❌ Save Blog Error:", err);
    return {
      success: false,
      error: "Failed to save blog",
    };
  }
}

// Remove a saved blog
export async function removeSavedBlog(blogId) {
  try {
    console.log("🔄 Removing blog from saved...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Remove blog from saved blogs
    user.savedBlogs = user.savedBlogs.filter((id) => id.toString() !== blogId);
    await user.save();

    console.log("✅ Blog removed from saved successfully");
    return { success: true, message: "Blog removed from saved blogs" };
  } catch (error) {
    console.error("❌ Remove Saved Blog Error:", error);
    return { success: false, error: "Failed to remove blog from saved" };
  }
}

// Update user profile
export async function updateUserProfile(updateData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    console.log("✅ User profile updated successfully");
    return {
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    };
  } catch (err) {
    console.error("❌ Update User Profile Error:", err);
    return {
      success: false,
      error: "Failed to update profile",
    };
  }
}

// Delete user account
export async function deleteUserAccount() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    await connectDB();

    const deletedUser = await User.findOneAndDelete({
      email: session.user.email,
    });

    if (!deletedUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    console.log("✅ User account deleted successfully");
    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch (err) {
    console.error("❌ Delete User Account Error:", err);
    return {
      success: false,
      error: "Failed to delete account",
    };
  }
}

// Check if blog is saved by user
export async function isBlogSaved(blogId) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: true,
        isSaved: false,
      };
    }

    await connectDB();

    const user = await User.findOne({
      email: session.user.email,
      savedBlogs: blogId,
    });

    return {
      success: true,
      isSaved: !!user,
    };
  } catch (err) {
    console.error("❌ Check Blog Saved Error:", err);
    return {
      success: false,
      error: "Failed to check if blog is saved",
      isSaved: false,
    };
  }
}

export async function saveBlogToUser(blogId) {
  try {
    console.log("🔄 Saving blog to user...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if blog is already saved
    if (user.savedBlogs.includes(blogId)) {
      return { success: false, error: "Blog already saved" };
    }

    // Add blog to saved blogs
    user.savedBlogs.push(blogId);
    await user.save();

    console.log("✅ Blog saved successfully");
    return { success: true, message: "Blog saved successfully" };
  } catch (error) {
    console.error("❌ Save Blog Error:", error);
    return { success: false, error: "Failed to save blog" };
  }
}

export async function unsaveBlogFromUser(blogId) {
  try {
    console.log("🔄 Removing blog from saved...");

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "Authentication required" };
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Remove blog from saved blogs
    user.savedBlogs = user.savedBlogs.filter((id) => id.toString() !== blogId);
    await user.save();

    console.log("✅ Blog removed from saved successfully");
    return { success: true, message: "Blog removed from saved" };
  } catch (error) {
    console.error("❌ Unsave Blog Error:", error);
    return { success: false, error: "Failed to remove blog from saved" };
  }
}

export async function checkIfBlogSaved(blogId) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, isSaved: false };
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { success: false, isSaved: false };
    }

    const isSaved = user.savedBlogs.includes(blogId);
    return { success: true, isSaved };
  } catch (error) {
    console.error("❌ Check Saved Blog Error:", error);
    return { success: false, isSaved: false };
  }
}
