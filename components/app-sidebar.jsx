"use client";
import * as React from "react";
import { ArrowLeft, GalleryVerticalEnd, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Add Blog",
          url: "/admin/blog/add",
        },
        {
          title: "View Blogs",
          url: "/admin/blog/view",
        },
        {
          title: "Newsletter Emails",
          url: "/admin/newsletters",
        },
        {
          title: "Contact Queries",
          url: "/admin/contact",
        },
        {
          title: "Profile",
          url: "/admin/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      console.log("🔄 Admin logging out from sidebar...");
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
      console.log("✅ Admin logout successful");
    } catch (error) {
      console.error("❌ Admin logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-background border border-border/50"
              size="lg"
              asChild
            >
              <Link href="/admin/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">WRYTO</span>
                  <span className="">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5 space-y-3">
                    {item.items.map((subItem) => {
                      const isActive = pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Button
                            size={"sm"}
                            className={cn(
                              "w-full dark:text-foreground",
                              !isActive && "bg-secondary-background"
                            )}
                            asChild
                          >
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </Button>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="">
              <SidebarMenuSub className="ml-0 border-l-0 px-1.5 space-y-3 border-t-2 border-border mt-10">
                <SidebarMenuSubItem>
                  <Button
                    size={"sm"}
                    className="w-full mt-5 cursor-pointer "
                    asChild
                  >
                    <Link href={"/"}>Back to site</Link>
                  </Button>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Button
                    size={"sm"}
                    className="w-full bg-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
