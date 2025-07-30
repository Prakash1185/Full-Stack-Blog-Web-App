import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import AuthSessionProvider from "@/components/providers/session-provider";
import { Analytics } from "@vercel/analytics/next";
import ClientLayout from "@/components/client-layout";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wryto - Full stack blog app",
  description:
    "Read insightful articles about AI, blockchain, wellness, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head/>
      <body className={`${dmSans.className}`}>
        <Toaster />
        <Analytics />
        <AuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientLayout>{children}</ClientLayout>
            <Toaster />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
