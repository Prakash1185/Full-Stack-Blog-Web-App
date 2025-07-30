import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db/db";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user with name from Google
          await User.create({
            name: user.name || profile?.name || "User",
            email: user.email,
            image: user.image,
            role: "user",
            savedBlogs: [],
          });
          console.log("✅ New user created:", user.email);
        } else {
          // Update existing user's info if needed
          if (
            existingUser.name !== user.name ||
            existingUser.image !== user.image
          ) {
            existingUser.name = user.name || profile?.name || existingUser.name;
            existingUser.image = user.image || existingUser.image;
            await existingUser.save();
            console.log("✅ User info updated:", user.email);
          }
        }

        return true;
      } catch (error) {
        console.error("❌ SignIn Error:", error);
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      // Add user info to JWT token on sign in
      if (user) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id.toString();
            token.name = dbUser.name;
            token.image = dbUser.image;
          }
        } catch (error) {
          console.error("❌ JWT Error:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Pass JWT token data to session
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.image = token.image;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Handle role-based redirects after successful login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
