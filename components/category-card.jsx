import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ category, blogCount }) => {
  return (
    <Card className="bg-main aspect-square cursor-pointer hover:shadow-lg transition-all duration-300 ease-linear">
      <CardContent className="flex flex-col justify-center items-center text-center w-full h-full p-4">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-center">
          {category}
        </h3>
        <p className="text-sm md:text-base lg:text-lg opacity-90">
          {blogCount} articles
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
