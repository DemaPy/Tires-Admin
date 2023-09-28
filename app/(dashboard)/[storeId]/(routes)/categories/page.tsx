import React from "react";
import { CategoryClient } from "./components/client";
import prismadb from "@/lib/prisma.db";
import { format } from "date-fns";

const Categories = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
    billboardLabel: item.billboard.label,
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
