import React from "react";
import { ProductCLient } from "./components/client";
import prismadb from "@/lib/prisma.db";
import { ProductColumns } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
const page = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true
    }
  });

  const formattedProducts: ProductColumns[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductCLient data={formattedProducts} />
      </div>
    </div>
  );
};

export default page;
