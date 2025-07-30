"use server";

import { Blog } from "@/models/blog.model";
import { revalidatePath } from "next/cache";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../cloudinary/cloudinary";
import { connectDB } from "../db/db";

// code to create a blog in admin panel
export async function createBlog(formData) {
  try {
    console.log("🔄 Starting blog creation process...");

    // Connect to database
    await connectDB();
    console.log("✅ Database connected successfully");

    // Extract data from formData
    const {
      title,
      description,
      category,
      tags,
      bannerImage,
      approval,
      markdown,
    } = formData;

    // Upload banner image to Cloudinary if provided
    let bannerImageUrl = null;
    let bannerImagePublicId = null;

    if (bannerImage) {
      console.log("🔄 Uploading image to Cloudinary...");
      const uploadResult = await uploadToCloudinary(
        bannerImage,
        "blog-banners"
      );

      if (!uploadResult.success) {
        console.error("❌ Image upload failed:", uploadResult.error);
        return {
          success: false,
          error: `Image upload failed: ${uploadResult.error}`,
        };
      }

      bannerImageUrl = uploadResult.url;
      bannerImagePublicId = uploadResult.publicId;
      console.log("✅ Image uploaded successfully");
    }

    // Create clean blog data object
    const blogData = {
      title: title?.trim(),
      description: description?.trim(),
      category: category,
      tags: Array.isArray(tags) ? tags : [],
      bannerImage: bannerImageUrl,
      bannerImagePublicId: bannerImagePublicId,
      approval: Boolean(approval),
      markdown: markdown?.trim(),
    };

    console.log("🔄 Creating blog in database...");

    // Create the blog
    const newBlog = await Blog.create(blogData);
    console.log("✅ Blog created successfully:", newBlog._id);

    // Revalidate the blog list page
    revalidatePath("/admin/blog/view");

    // Return clean response (avoid circular references)
    return {
      success: true,
      blog: {
        _id: newBlog._id.toString(),
        title: newBlog.title,
        description: newBlog.description,
        category: newBlog.category,
        tags: newBlog.tags,
        approval: newBlog.approval,
        createdAt: newBlog.createdAt,
      },
    };
  } catch (err) {
    console.error("❌ Create Blog Error:", err);

    // Return clean error response
    let errorMessage = "An unexpected error occurred";

    if (err.name === "MongoTimeoutError" || err.code === "ETIMEOUT") {
      errorMessage =
        "Database connection timeout. Please check your internet connection and try again.";
    } else if (err.name === "MongoNetworkError") {
      errorMessage = "Unable to connect to database. Please try again later.";
    } else if (err.name === "ValidationError") {
      errorMessage = `Validation error: ${err.message}`;
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// code to get all blogs (approved + pending)
export async function getAllBlogs() {
  try {
    console.log("🔄 Fetching all blogs...");
    await connectDB();

    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    console.log(`✅ Found ${blogs.length} total blogs`);

    return {
      success: true,
      blogs: blogs,
      count: blogs.length,
    };
  } catch (err) {
    console.error("❌ Get All Blogs Error:", err);

    let errorMessage = "Failed to fetch blogs";

    if (err.name === "MongoTimeoutError" || err.code === "ETIMEOUT") {
      errorMessage = "Database connection timeout. Please try again.";
    } else if (err.name === "MongoNetworkError") {
      errorMessage = "Unable to connect to database. Please try again later.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
      blogs: [],
      count: 0,
    };
  }
}

// code to get a blog by id
export async function getBlogById(id) {
  try {
    await connectDB();
    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, error: "Blog not found" };
    }
    return { success: true, blog };
  } catch (err) {
    console.error("Get Blog By ID Error", err);
    return { success: false, error: err.message };
  }
}

// code to update a blog by id in admin panel
export async function updateBlog(id, data) {
  try {
    await connectDB();

    // Get existing blog to check for image changes
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return { success: false, error: "Blog not found" };
    }

    let bannerImageUrl = existingBlog.bannerImage;
    let bannerImagePublicId = existingBlog.bannerImagePublicId;

    // If new image is provided, upload it and delete old one
    if (data.bannerImage && data.bannerImage !== existingBlog.bannerImage) {
      // Upload new image
      const uploadResult = await uploadToCloudinary(
        data.bannerImage,
        "blog-banners"
      );

      if (!uploadResult.success) {
        return {
          success: false,
          error: `Image upload failed: ${uploadResult.error}`,
        };
      }

      // Delete old image if it exists
      if (existingBlog.bannerImagePublicId) {
        await deleteFromCloudinary(existingBlog.bannerImagePublicId);
      }

      bannerImageUrl = uploadResult.url;
      bannerImagePublicId = uploadResult.publicId;
    }

    // Update blog data
    const updateData = {
      ...data,
      bannerImage: bannerImageUrl,
      bannerImagePublicId: bannerImagePublicId,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    revalidatePath("/admin/blog/view");

    return { success: true, blog: updatedBlog };
  } catch (err) {
    console.error("Update Blog Error", err);
    return { success: false, error: err.message };
  }
}

// code to delete a blog by id in admin panel
export async function deleteBlog(id) {
  try {
    await connectDB();

    const blogToDelete = await Blog.findById(id);
    if (!blogToDelete) {
      return { success: false, error: "Blog not found" };
    }

    // Delete image from Cloudinary if it exists
    if (blogToDelete.bannerImagePublicId) {
      await deleteFromCloudinary(blogToDelete.bannerImagePublicId);
    }

    // Delete blog from database
    await Blog.findByIdAndDelete(id);

    revalidatePath("/admin/blog/view");
    return { success: true, message: "Blog deleted successfully" };
  } catch (err) {
    console.error("Delete Blog Error", err);
    return { success: false, error: err.message };
  }
}

export async function toggleBlogApproval(id) {
  try {
    console.log(`🔄 Toggling approval for blog: ${id}`);
    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, error: "Blog not found" };
    }

    // Toggle the approval status
    blog.approval = !blog.approval;
    await blog.save();

    console.log(`✅ Blog approval toggled to: ${blog.approval}`);

    // Revalidate the blog list page
    revalidatePath("/admin/blog/view");

    return {
      success: true,
      blog: {
        _id: blog._id.toString(),
        title: blog.title,
        approval: blog.approval,
      },
      message: `Blog ${blog.approval ? "approved" : "unapproved"} successfully`,
    };
  } catch (err) {
    console.error("❌ Toggle Blog Approval Error:", err);

    let errorMessage = "Failed to toggle blog approval";

    if (err.name === "MongoTimeoutError" || err.code === "ETIMEOUT") {
      errorMessage = "Database connection timeout. Please try again.";
    } else if (err.name === "MongoNetworkError") {
      errorMessage = "Unable to connect to database. Please try again later.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
// Get all approved blogs for public viewing
export async function getAllApprovedBlogs() {
  try {
    console.log("🔄 Fetching all approved blogs...");
    await connectDB();

    const blogs = await Blog.find({ approval: true })
      .sort({ createdAt: -1 })
      .lean();

    console.log(`✅ Found ${blogs.length} approved blogs`);

    // Convert ObjectIds to strings and clean data
    const cleanBlogs = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      category: blog.category,
      tags: blog.tags || [],
      bannerImage: blog.bannerImage,
      createdAt: blog.createdAt,
      approval: blog.approval,
    }));

    return {
      success: true,
      blogs: cleanBlogs,
      count: cleanBlogs.length,
    };
  } catch (err) {
    console.error("❌ Get All Approved Blogs Error:", err);
    return {
      success: false,
      error: "Failed to fetch approved blogs",
      blogs: [],
    };
  }
}

// code to get all pending blogs (for admin review)
export async function getPendingBlogs() {
  try {
    console.log("🔄 Fetching pending blogs...");
    await connectDB();

    const pendingBlogs = await Blog.find({ approval: false }).sort({
      createdAt: -1,
    });

    console.log(`✅ Found ${pendingBlogs.length} pending blogs`);

    return {
      success: true,
      blogs: pendingBlogs,
      count: pendingBlogs.length,
    };
  } catch (err) {
    console.error("❌ Get Pending Blogs Error:", err);

    let errorMessage = "Failed to fetch pending blogs";

    if (err.name === "MongoTimeoutError" || err.code === "ETIMEOUT") {
      errorMessage = "Database connection timeout. Please try again.";
    } else if (err.name === "MongoNetworkError") {
      errorMessage = "Unable to connect to database. Please try again later.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
      blogs: [],
      count: 0,
    };
  }
}

// Get all blog categories with counts
export async function getBlogCategories() {
  try {
    console.log("🔄 Fetching blog categories...");
    await connectDB();

    // Aggregate to get categories with approved blog counts
    const categories = await Blog.aggregate([
      { $match: { approval: true } }, // Only approved blogs
      {
        $group: {
          _id: "$category",
          blogCount: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          blogCount: 1,
          _id: 0,
        },
      },
      { $sort: { category: 1 } },
    ]);

    console.log(`✅ Found ${categories.length} categories`);

    return {
      success: true,
      categories: categories,
      count: categories.length,
    };
  } catch (err) {
    console.error("❌ Get Blog Categories Error:", err);
    return {
      success: false,
      error: "Failed to fetch blog categories",
      categories: [],
    };
  }
}

// Get blogs by category (only approved ones)
export async function getBlogsByCategory(category) {
  try {
    console.log(`🔄 Fetching blogs for category: ${category}`);
    await connectDB();

    const blogs = await Blog.find({
      category: category,
      approval: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    console.log(`✅ Found ${blogs.length} approved blogs in ${category}`);

    // Convert ObjectIds to strings and clean data
    const cleanBlogs = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      category: blog.category,
      tags: blog.tags || [],
      bannerImage: blog.bannerImage,
      createdAt: blog.createdAt,
      approval: blog.approval,
    }));

    return {
      success: true,
      blogs: cleanBlogs,
      category: category,
      count: cleanBlogs.length,
    };
  } catch (err) {
    console.error(`❌ Get Blogs By Category Error for ${category}:`, err);
    return {
      success: false,
      error: `Failed to fetch ${category} blogs`,
      blogs: [],
    };
  }
}

export async function getLatestBlogs(limit = 6) {
  try {
    console.log(`🔄 Fetching ${limit} latest blogs...`);
    await connectDB();

    const blogs = await Blog.find({ approval: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    console.log(`✅ Found ${blogs.length} latest approved blogs`);

    // Convert ObjectIds to strings and clean data
    const cleanBlogs = blogs.map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      category: blog.category,
      tags: blog.tags || [],
      bannerImage: blog.bannerImage,
      createdAt: blog.createdAt,
      approval: blog.approval,
    }));

    return {
      success: true,
      blogs: cleanBlogs,
      count: cleanBlogs.length,
    };
  } catch (err) {
    console.error("❌ Get Latest Blogs Error:", err);
    return {
      success: false,
      error: "Failed to fetch latest blogs",
      blogs: [],
    };
  }
}

// Get latest approved blogs for hero section
export async function getLatestBlogsForHero(limit = 5) {
  try {
    console.log("🔄 Fetching latest approved blogs for hero section...");
    await connectDB();

    const latestBlogs = await Blog.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title description bannerImage category createdAt")
      .lean();

    // Convert ObjectIds to strings and use _id as the identifier
    const cleanBlogs = latestBlogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      bannerImage: blog.bannerImage || "/placeholder-blog.jpg",
      category: blog.category,
      createdAt: blog.createdAt,
    }));

    console.log(`✅ Found ${cleanBlogs.length} latest approved blogs for hero`);

    return {
      success: true,
      blogs: cleanBlogs,
      count: cleanBlogs.length,
    };
  } catch (err) {
    console.error("❌ Latest Blogs for Hero Error:", err);
    return {
      success: false,
      error: "Failed to fetch latest blogs",
      blogs: [],
    };
  }
}
