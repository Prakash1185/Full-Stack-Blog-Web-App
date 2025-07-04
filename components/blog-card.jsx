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

const BlogCard = ({
  image,
  title,
  description,
  date,
  category,
  onReadMore,
}) => {
  // Truncate description to show "..." at the end
  const truncatedDescription =
    description?.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  const slugTitle = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return (
    <Card className="w-full  flex flex-col bg-main gap-4 transition-shadow duration-300  py-0 mt-12">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-sm" />
          <Badge variant="" className="absolute text-sm top-2 left-2">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-0 dark:text-background">
        <h3 className="text-2xl font-semibold mb-2 capitalize tracking-tight">
          {title}
        </h3>
        <p className="text-sm mb-3">{truncatedDescription}</p>
        <div className="flex items-center text-sm">
          <CalendarIcon className="w-3 h-3 mr-1" />
          {new Date(date).toLocaleDateString()}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 w-full mt-auto">
        <Link href={`/blog/${slugTitle}`} className="w-full">
          <Button className="w-full bg-background dark:bg-foreground cursor-pointer">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
