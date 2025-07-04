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
      href: "mailto:",
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
    <footer className="py-12 pb-5 px-16 ">
      <div className="   mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold mb-2">Wryto</h3>
            <p className="text-sm">Quality blogs worth your time</p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
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
                    <IconComponent className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-5 border-t text-center">
          <p className="text-sm">© {new Date().getFullYear()} Wryto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
