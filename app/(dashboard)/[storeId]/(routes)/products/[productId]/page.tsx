import prismadb from "@/lib/prisma.db";
import React from "react";
import ProductForm from "./components/product-form";

const page = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm store={product} colors={colors} categories={categories} sizes={sizes} />
      </div>
    </div>
  );
};

export default page;
