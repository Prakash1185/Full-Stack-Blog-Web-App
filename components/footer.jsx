import React from "react";
import Link from "next/link";
import {
  RiGithubFill,
  RiLinkedinFill,
  RiMailFill,
  RiTwitterXFill,
} from "@remixicon/react";

const Footer = () => {
  // Social media links array
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: RiGithubFill,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: RiTwitterXFill,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: RiLinkedinFill,
    },
    {
      name: "Email",
      href: "mailto:contact@wryto.com",
      icon: RiMailFill,
    },
  ];

  // Quick links array
  const quickLinks = [
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Categories",
      href: "/category",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
  ];

  return (
    <footer className="py-8 pb-4  md:py-12 px-4 md:px-8 lg:px-16 border-t-4 border-border">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <Link href={"/"}>
              <h3 className="text-3xl lg:text-4xl font-bold mb-2">Wryto</h3>
            </Link>
            <p className="text-xs md:text-sm">Quality blogs worth your time</p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">
              Follow Us
            </h4>
            <div className="flex justify-center space-x-3 md:space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="hover:opacity-70 transition-opacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-sm md:text-base font-semibold mb-3 md:mb-4">
              Quick Links
            </h4>
            <div className="space-y-1 md:space-y-2">
              {quickLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm hover:opacity-70 transition-opacity block"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 pb-0 md:pt-5 border-t text-center">
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} Wryto. Made with ❤️ by Prakash
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
