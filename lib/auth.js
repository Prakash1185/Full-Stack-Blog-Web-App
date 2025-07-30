import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db/db";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // Add these for production
  secret: process.env.NEXTAUTH_SECRET,

  // Add session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Add JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            token.role = existingUser.role;
            token.id = existingUser._id.toString();
          } else {
            // Create new user
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user",
            });
            token.role = newUser.role;
            token.id = newUser._id.toString();
          }
        } catch (error) {
          token.role = "user"; // Fallback
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Add debug for production issues
  debug: process.env.NODE_ENV === "development",
};
