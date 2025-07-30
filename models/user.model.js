import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Remove the index: true here since unique already creates an index
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Only create indexes if they don't exist
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
