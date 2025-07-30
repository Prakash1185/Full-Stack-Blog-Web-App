"use server";
import Newsletter from "@/models/newsletter.model";
import { connectDB } from "../db/db";

// Subscribe to newsletter
export async function subscribeToNewsletter(email) {
  try {
    await connectDB();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return {
        success: false,
        error: "This email is already subscribed to our newsletter",
      };
    }

    // Create new subscription
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();


    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
      email: email,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to subscribe to newsletter. Please try again.",
    };
  }
}

// Get all newsletter subscribers (for admin)
export async function getAllSubscribers() {
  try {
    await connectDB();

    const subscribers = await Newsletter.find({})
      .sort({ subscribedAt: -1 })
      .lean();


    // Convert ObjectIds to strings
    const cleanSubscribers = subscribers.map((subscriber) => ({
      _id: subscriber._id.toString(),
      email: subscriber.email,
      subscribedAt: subscriber.subscribedAt,
      createdAt: subscriber.createdAt,
    }));

    return {
      success: true,
      subscribers: cleanSubscribers,
      count: cleanSubscribers.length,
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to fetch subscribers",
      subscribers: [],
    };
  }
}

// Delete subscriber (for admin)
export async function deleteSubscriber(subscriberId) {
  try {
    await connectDB();

    const deletedSubscriber = await Newsletter.findByIdAndDelete(subscriberId);

    if (!deletedSubscriber) {
      return {
        success: false,
        error: "Subscriber not found",
      };
    }


    return {
      success: true,
      message: "Subscriber deleted successfully",
    };
  } catch (err) {
    return {
      success: false,
      error: "Failed to delete subscriber",
    };
  }
}
