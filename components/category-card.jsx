import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CategoryCard = ({ category, blogCount }) => {
  return (
    <Card className={`bg-main w-[15rem] h-[15rem] cursor-pointer hover:shadow-lg transition-all duration-300 ease-linear`}>
      <CardContent className=" flex flex-col justify-center items-center text-center w-full h-full text-3xl dark:text-background">
        <h3 className=" font-bold mb-2">{category}</h3>
        <p className="text-xl opacity-90">{blogCount} articles</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
