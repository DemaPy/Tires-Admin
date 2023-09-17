import prismadb from "@/lib/prisma.db";
import React from "react";

const DashboardPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;
