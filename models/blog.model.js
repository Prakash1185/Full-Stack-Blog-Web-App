import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  tags: [String],
  bannerImage: String, // Cloudinary URL
  bannerImagePublicId: String, // Cloudinary public ID for deletion
  approval: { type: Boolean, default: false },
  markdown: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);