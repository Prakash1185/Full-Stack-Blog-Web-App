"use server";

import Contact from "@/models/contact.model";
import { connectDB } from "../db/db";

// Submit contact form
export async function submitContactForm(formData) {
  try {
    console.log("🔄 Processing contact form submission for:", formData.email);
    await connectDB();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Validate name length
    if (formData.name.trim().length < 2) {
      return {
        success: false,
        error: "Name must be at least 2 characters long",
      };
    }

    // Validate message length
    if (formData.message.trim().length < 10) {
      return {
        success: false,
        error: "Message must be at least 10 characters long",
      };
    }

    // Create new contact submission
    const newContact = new Contact({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    await newContact.save();

    console.log("✅ Contact form submission successful for:", formData.email);

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      contactId: newContact._id.toString(),
    };
  } catch (err) {
    console.error("❌ Contact Form Submission Error:", err);
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
}

// Get all contact submissions (for admin)
export async function getAllContactSubmissions() {
  try {
    console.log("🔄 Fetching all contact submissions...");
    await connectDB();

    const contacts = await Contact.find({}).sort({ submittedAt: -1 }).lean();

    console.log(`✅ Found ${contacts.length} contact submissions`);

    // Convert ObjectIds to strings
    const cleanContacts = contacts.map((contact) => ({
      _id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      message: contact.message,
      submittedAt: contact.submittedAt,
      createdAt: contact.createdAt,
    }));

    return {
      success: true,
      contacts: cleanContacts,
      count: cleanContacts.length,
    };
  } catch (err) {
    console.error("❌ Get Contact Submissions Error:", err);
    return {
      success: false,
      error: "Failed to fetch contact submissions",
      contacts: [],
    };
  }
}


// Delete contact submission (for admin)
export async function deleteContactSubmission(contactId) {
  try {
    console.log("🔄 Deleting contact submission:", contactId);
    await connectDB();

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return {
        success: false,
        error: "Contact submission not found"
      };
    }

    console.log("✅ Contact submission deleted successfully");

    return {
      success: true,
      message: "Contact submission deleted successfully"
    };
  } catch (err) {
    console.error("❌ Delete Contact Submission Error:", err);
    return {
      success: false,
      error: "Failed to delete contact submission"
    };
  }
}