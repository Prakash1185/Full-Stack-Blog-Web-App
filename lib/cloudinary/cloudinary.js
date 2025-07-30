import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  base64String,
  folder = "blog-banners"
) {
  try {
    // Validate base64 string
    if (!base64String || typeof base64String !== "string") {
      throw new Error("Invalid base64 string provided");
    }

    const result = await cloudinary.uploader.upload(base64String, {
      folder: folder,
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 600, crop: "fill", quality: "auto" },
        { format: "webp" },
      ],
      // Add timeout to prevent hanging
      timeout: 60000, // 60 seconds
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to upload image",
    };
  }
}

export async function deleteFromCloudinary(publicId) {
  try {
    if (!publicId) {
      throw new Error("Public ID is required for deletion");
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to delete image",
    };
  }
}

export default cloudinary;
