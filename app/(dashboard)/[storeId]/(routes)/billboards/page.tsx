import React from "react";
import { BillboardClient } from "./components/client";
import prismadb from "@/lib/prisma.db";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
const page = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default page;
