import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

const BlogCard = ({ id, image, title, description, date, category, tags }) => {
  // Truncate description to show "..." at the end
  const truncatedDescription =
    description?.length > 180
      ? description.substring(0, 180) + "..."
      : description;

  const slugTitle = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  // Format date consistently for SSR/client hydration
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Card className="w-full max-w-sm mx-auto md:max-w-none flex flex-col bg-main transition-shadow duration-300 py-0 mt-6 md:mt-12">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden border-b-2 border-border">
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-t-sm"
          />
          <Badge
            variant=""
            className="absolute text-xs md:text-sm top-2 left-2"
          >
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-3 md:p-4 pt-0 dark:text-background">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 capitalize tracking-tight line-clamp-2 -mt-6 ">
          {title}
        </h3>
        <p className="text-xs md:text-sm mb-3 line-clamp-3">
          {truncatedDescription}
        </p>
        <div className="flex items-center text-xs md:text-sm">
          <CalendarIcon className="w-3 h-3 mr-1" />
          <span className="text-xs md:text-sm">{formatDate(date)}</span>
        </div>
        
      </CardContent>

      <CardFooter className="p-3 md:p-4 pt-0 w-full mt-auto">
        <Link href={`/blog/${id}`} className="w-full">
          <Button className="w-full bg-background dark:bg-foreground cursor-pointer text-sm md:text-base py-2 md:py-3">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
