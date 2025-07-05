"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { socialLinks } from "@/data/socials";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8 mt-16 md:mt-20">
      <div className=" mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have a question or want to collaborate? 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-10">
          {/* Left Side - About Section */}
          <div className="space-y-6 ">
            {/* About Card */}
            <Card className="bg-card bg-secondary-background selection:bg-main dark:selection:text-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <MessageCircle className="w-6 h-6" />
                  About Wryto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base leading-relaxed">
                  Welcome to Wryto, where quality content meets passionate
                  storytelling. We're dedicated to creating meaningful blog
                  posts that inform, inspire, and engage our community of
                  readers.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Our team of writers and creators work tirelessly to bring you
                  the latest insights in technology, lifestyle, design, and
                  more. Every article is crafted with care and attention to
                  detail.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Whether you're looking to stay updated with industry trends,
                  learn something new, or simply enjoy a good read, Wryto is
                  your go-to destination for quality content.
                </p>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="bg-card bg-secondary-background">
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-sm border border-border bg-main dark:text-background"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {social.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                  <Send className="w-6 h-6" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full max-h-28 min-h-20"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-6 text-base font-medium cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
